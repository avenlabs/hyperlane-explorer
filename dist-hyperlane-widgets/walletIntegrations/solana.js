import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Connection } from '@solana/web3.js';
import { useCallback, useMemo } from 'react';
import { ProviderType, } from '@hyperlane-xyz/sdk';
import { ProtocolType } from '@hyperlane-xyz/utils';
import { widgetLogger } from '../logger.js';
import { findChainByRpcUrl } from './utils.js';
const logger = widgetLogger.child({ module: 'walletIntegrations/solana' });
export function useSolanaAccount(_multiProvider) {
    const { publicKey, connected, wallet } = useWallet();
    const isReady = !!(publicKey && wallet && connected);
    const address = publicKey?.toBase58();
    return useMemo(() => ({
        protocol: ProtocolType.Sealevel,
        addresses: address ? [{ address: address }] : [],
        isReady: isReady,
    }), [address, isReady]);
}
export function useSolanaWalletDetails() {
    const { wallet } = useWallet();
    const { name, icon } = wallet?.adapter || {};
    return useMemo(() => ({
        name,
        logoUrl: icon,
    }), [name, icon]);
}
export function useSolanaConnectFn() {
    const { setVisible } = useWalletModal();
    return useCallback(() => setVisible(true), [setVisible]);
}
export function useSolanaDisconnectFn() {
    const { disconnect } = useWallet();
    return disconnect;
}
export function useSolanaActiveChain(multiProvider) {
    const { connection } = useConnection();
    const connectionEndpoint = connection?.rpcEndpoint;
    return useMemo(() => {
        try {
            const hostname = new URL(connectionEndpoint).hostname;
            const metadata = findChainByRpcUrl(multiProvider, hostname);
            if (!metadata)
                return {};
            return {
                chainDisplayName: metadata.displayName,
                chainName: metadata.name,
            };
        }
        catch (error) {
            logger.warn('Error finding sol active chain', error);
            return {};
        }
    }, [connectionEndpoint, multiProvider]);
}
export function useSolanaTransactionFns(multiProvider) {
    const { sendTransaction: sendSolTransaction } = useWallet();
    const onSwitchNetwork = useCallback(async (chainName) => {
        logger.warn(`Solana wallet must be connected to origin chain ${chainName}`);
    }, []);
    const onSendTx = useCallback(async ({ tx, chainName, activeChainName, }) => {
        if (tx.type !== ProviderType.SolanaWeb3)
            throw new Error(`Unsupported tx type: ${tx.type}`);
        if (activeChainName && activeChainName !== chainName)
            await onSwitchNetwork(chainName);
        const rpcUrl = multiProvider.getRpcUrl(chainName);
        const connection = new Connection(rpcUrl, 'confirmed');
        const { context: { slot: minContextSlot }, value: { blockhash, lastValidBlockHeight }, } = await connection.getLatestBlockhashAndContext();
        logger.debug(`Sending tx on chain ${chainName}`);
        const signature = await sendSolTransaction(tx.transaction, connection, {
            minContextSlot,
        });
        const confirm = () => connection
            .confirmTransaction({ blockhash, lastValidBlockHeight, signature })
            .then(() => connection.getTransaction(signature))
            .then((r) => ({
            type: ProviderType.SolanaWeb3,
            receipt: r,
        }));
        return { hash: signature, confirm };
    }, [onSwitchNetwork, sendSolTransaction, multiProvider]);
    return { sendTransaction: onSendTx, switchNetwork: onSwitchNetwork };
}
//# sourceMappingURL=solana.js.map