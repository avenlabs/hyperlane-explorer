import { BigNumber as EthersBN, } from 'ethers';
export function ethers5TxToWagmiTx(tx) {
    if (!tx.to)
        throw new Error('No tx recipient address specified');
    return {
        to: tx.to,
        value: ethersBnToBigInt(tx.value || EthersBN.from('0')),
        data: tx.data,
        nonce: tx.nonce,
        chainId: tx.chainId,
        gas: tx.gasLimit ? ethersBnToBigInt(tx.gasLimit) : undefined,
        gasPrice: tx.gasPrice ? ethersBnToBigInt(tx.gasPrice) : undefined,
        maxFeePerGas: tx.maxFeePerGas
            ? ethersBnToBigInt(tx.maxFeePerGas)
            : undefined,
        maxPriorityFeePerGas: tx.maxPriorityFeePerGas
            ? ethersBnToBigInt(tx.maxPriorityFeePerGas)
            : undefined,
    };
}
function ethersBnToBigInt(bn) {
    return BigInt(bn.toString());
}
export function getChainsForProtocol(multiProvider, protocol) {
    return Object.values(multiProvider.metadata).filter((c) => c.protocol === protocol);
}
export function findChainByRpcUrl(multiProvider, url) {
    if (!url)
        return undefined;
    const allMetadata = Object.values(multiProvider.metadata);
    const searchUrl = url.toLowerCase();
    return allMetadata.find((m) => !!m.rpcUrls.find((rpc) => rpc.http.toLowerCase().includes(searchUrl)));
}
//# sourceMappingURL=utils.js.map