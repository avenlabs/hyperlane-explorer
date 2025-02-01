import React from 'react';
import { MessageStatus, MessageStage as Stage, StageTimings } from './types.js';
interface Props {
    status: MessageStatus;
    stage: Stage;
    timings: StageTimings;
    timestampSent?: number;
    hideDescriptions?: boolean;
}
export declare function MessageTimeline({ status, stage: _stage, timings, timestampSent, hideDescriptions, }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=MessageTimeline.d.ts.map