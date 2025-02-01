import { useMemo } from 'react';
import { ProtocolType } from '@hyperlane-xyz/utils';
import { widgetLogger } from '../logger.js';
import { useCosmosAccount, useCosmosActiveChain, useCosmosConnectFn, useCosmosDisconnectFn, useCosmosTransactionFns, useCosmosWalletDetails, } from './cosmos.js';
import { useEthereumAccount, useEthereumActiveChain, useEthereumConnectFn, useEthereumDisconnectFn, useEthereumTransactionFns, useEthereumWalletDetails, } from './ethereum.js';
import { useSolanaAccount, useSolanaActiveChain, useSolanaConnectFn, useSolanaDisconnectFn, useSolanaTransactionFns, useSolanaWalletDetails, } from './solana.js';
const logger = widgetLogger.child({
    module: 'walletIntegrations/multiProtocol',
});
export function useAccounts(multiProvider, blacklistedAddresses = []) {
    const evmAccountInfo = useEthereumAccount(multiProvider);
    const solAccountInfo = useSolanaAccount(multiProvider);
    const cosmAccountInfo = useCosmosAccount(multiProvider);
    // Filtered ready accounts
    const readyAccounts = useMemo(() => [evmAccountInfo, solAccountInfo, cosmAccountInfo].filter((a) => a.isReady), [evmAccountInfo, solAccountInfo, cosmAccountInfo]);
    // Check if any of the ready accounts are blacklisted
    const readyAddresses = readyAccounts
        .map((a) => a.addresses)
        .flat()
        .map((a) => a.address.toLowerCase());
    if (readyAddresses.some((a) => blacklistedAddresses.includes(a))) {
        throw new Error('Wallet address is blacklisted');
    }
    return useMemo(() => ({
        accounts: {
            [ProtocolType.Ethereum]: evmAccountInfo,
            [ProtocolType.Sealevel]: solAccountInfo,
            [ProtocolType.Cosmos]: cosmAccountInfo,
        },
        readyAccounts,
    }), [evmAccountInfo, solAccountInfo, cosmAccountInfo, readyAccounts]);
}
export function useAccountForChain(multiProvider, chainName) {
    const { accounts } = useAccounts(multiProvider);
    const protocol = chainName ? multiProvider.getProtocol(chainName) : undefined;
    if (!chainName || !protocol)
        return undefined;
    return accounts?.[protocol];
}
export function useAccountAddressForChain(multiProvider, chainName) {
    const { accounts } = useAccounts(multiProvider);
    return getAccountAddressForChain(multiProvider, chainName, accounts);
}
export function getAccountAddressForChain(multiProvider, chainName, accounts) {
    if (!chainName || !accounts)
        return undefined;
    const protocol = multiProvider.getProtocol(chainName);
    const account = accounts[protocol];
    if (protocol === ProtocolType.Cosmos) {
        return account?.addresses.find((a) => a.chainName === chainName)?.address;
    }
    else {
        // Use first because only cosmos has the notion of per-chain addresses
        return account?.addresses[0]?.address;
    }
}
export function getAccountAddressAndPubKey(multiProvider, chainName, accounts) {
    const address = getAccountAddressForChain(multiProvider, chainName, accounts);
    if (!accounts || !chainName || !address)
        return {};
    const protocol = multiProvider.getProtocol(chainName);
    const publicKey = accounts[protocol]?.publicKey;
    return { address, publicKey };
}
export function useWalletDetails() {
    const evmWallet = useEthereumWalletDetails();
    const solWallet = useSolanaWalletDetails();
    const cosmosWallet = useCosmosWalletDetails();
    return useMemo(() => ({
        [ProtocolType.Ethereum]: evmWallet,
        [ProtocolType.Sealevel]: solWallet,
        [ProtocolType.Cosmos]: cosmosWallet,
    }), [evmWallet, solWallet, cosmosWallet]);
}
export function useConnectFns() {
    const onConnectEthereum = useEthereumConnectFn();
    const onConnectSolana = useSolanaConnectFn();
    const onConnectCosmos = useCosmosConnectFn();
    return useMemo(() => ({
        [ProtocolType.Ethereum]: onConnectEthereum,
        [ProtocolType.Sealevel]: onConnectSolana,
        [ProtocolType.Cosmos]: onConnectCosmos,
    }), [onConnectEthereum, onConnectSolana, onConnectCosmos]);
}
export function useDisconnectFns() {
    const disconnectEvm = useEthereumDisconnectFn();
    const disconnectSol = useSolanaDisconnectFn();
    const disconnectCosmos = useCosmosDisconnectFn();
    const onClickDisconnect = (env, disconnectFn) => async () => {
        try {
            if (!disconnectFn)
                throw new Error('Disconnect function is null');
            await disconnectFn();
        }
        catch (error) {
            logger.error(`Error disconnecting from ${env} wallet`, error);
        }
    };
    return useMemo(() => ({
        [ProtocolType.Ethereum]: onClickDisconnect(ProtocolType.Ethereum, disconnectEvm),
        [ProtocolType.Sealevel]: onClickDisconnect(ProtocolType.Sealevel, disconnectSol),
        [ProtocolType.Cosmos]: onClickDisconnect(ProtocolType.Cosmos, disconnectCosmos),
    }), [disconnectEvm, disconnectSol, disconnectCosmos]);
}
export function useActiveChains(multiProvider) {
    const evmChain = useEthereumActiveChain(multiProvider);
    const solChain = useSolanaActiveChain(multiProvider);
    const cosmChain = useCosmosActiveChain(multiProvider);
    const readyChains = useMemo(() => [evmChain, solChain, cosmChain].filter((c) => !!c.chainDisplayName), [evmChain, solChain, cosmChain]);
    return useMemo(() => ({
        chains: {
            [ProtocolType.Ethereum]: evmChain,
            [ProtocolType.Sealevel]: solChain,
            [ProtocolType.Cosmos]: cosmChain,
        },
        readyChains,
    }), [evmChain, solChain, cosmChain, readyChains]);
}
export function useTransactionFns(multiProvider) {
    const { switchNetwork: onSwitchEvmNetwork, sendTransaction: onSendEvmTx } = useEthereumTransactionFns(multiProvider);
    const { switchNetwork: onSwitchSolNetwork, sendTransaction: onSendSolTx } = useSolanaTransactionFns(multiProvider);
    const { switchNetwork: onSwitchCosmNetwork, sendTransaction: onSendCosmTx } = useCosmosTransactionFns(multiProvider);
    return useMemo(() => ({
        [ProtocolType.Ethereum]: {
            sendTransaction: onSendEvmTx,
            switchNetwork: onSwitchEvmNetwork,
        },
        [ProtocolType.Sealevel]: {
            sendTransaction: onSendSolTx,
            switchNetwork: onSwitchSolNetwork,
        },
        [ProtocolType.Cosmos]: {
            sendTransaction: onSendCosmTx,
            switchNetwork: onSwitchCosmNetwork,
        },
    }), [
        onSendEvmTx,
        onSendSolTx,
        onSwitchEvmNetwork,
        onSwitchSolNetwork,
        onSendCosmTx,
        onSwitchCosmNetwork,
    ]);
}
//# sourceMappingURL=multiProtocol.js.map