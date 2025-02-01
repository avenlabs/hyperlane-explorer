import { useEffect, useState } from 'react';
import { isBlockExplorerHealthy, isRpcHealthy, } from '@hyperlane-xyz/sdk';
import { timeout } from '@hyperlane-xyz/utils';
import { ChainConnectionType } from '../chains/types.js';
const HEALTH_TEST_TIMEOUT = 5000; // 5s
export function useConnectionHealthTest(chainMetadata, index, type) {
    const [isHealthy, setIsHealthy] = useState(undefined);
    const tester = type === ChainConnectionType.RPC ? isRpcHealthy : isBlockExplorerHealthy;
    useEffect(() => {
        // TODO run explorer test through CORS proxy, otherwise it's blocked by browser
        if (type === ChainConnectionType.Explorer)
            return;
        timeout(tester(chainMetadata, index), HEALTH_TEST_TIMEOUT)
            .then((result) => setIsHealthy(result))
            .catch(() => setIsHealthy(false));
    }, [chainMetadata, index, type, tester]);
    return isHealthy;
}
//# sourceMappingURL=useChainConnectionTest.js.map