import React from 'react';
import { ColorPalette } from '../color.js';
import { AirplaneIcon } from '../icons/Airplane.js';
import { EnvelopeIcon } from '../icons/Envelope.js';
import { LockIcon } from '../icons/Lock.js';
import { ShieldIcon } from '../icons/Shield.js';
import { WideChevronIcon } from '../icons/WideChevron.js';
import { MessageStatus, MessageStage as Stage } from './types.js';
export function MessageTimeline({ status, stage: _stage, timings, timestampSent, hideDescriptions, }) {
    // Ignore stage value if status shows as delivered
    const stage = status === MessageStatus.Delivered ? Stage.Relayed : _stage;
    const timeSent = timestampSent ? new Date(timestampSent) : null;
    const timeSentStr = timeSent
        ? `${timeSent.toLocaleDateString()} ${timeSent.toLocaleTimeString()}`
        : null;
    return (React.createElement("div", { className: "htw-pt-14 htw-pb-1 htw-flex htw-w-full" },
        React.createElement("div", { className: styles.stageContainer },
            React.createElement("div", { className: `${styles.stageBar} htw-rounded-l ${getStageOpacityClass(Stage.Sent, stage, status)}` },
                React.createElement("div", { className: styles.stageHole }),
                React.createElement("div", { className: styles.stageIconContainer },
                    React.createElement(StageIcon, { Icon: AirplaneIcon }),
                    React.createElement("div", { className: styles.stageIconCircle })),
                React.createElement(ChevronBlue, null)),
            React.createElement("h4", { className: styles.stageHeader }, getStageHeader(Stage.Sent, stage, timings, status)),
            !hideDescriptions && (React.createElement("p", { className: styles.stageDesc }, timeSentStr
                ? `Origin transaction sent at ${timeSentStr}`
                : 'Waiting for origin transaction'))),
        React.createElement("div", { className: styles.stageSpacer }),
        React.createElement("div", { className: styles.stageContainer },
            React.createElement("div", { className: `${styles.stageBar} ${getStageOpacityClass(Stage.Finalized, stage, status)}` },
                React.createElement("div", { className: styles.stageHole }),
                React.createElement("div", { className: styles.stageIconContainer },
                    React.createElement(StageIcon, { Icon: LockIcon, size: 14 }),
                    React.createElement("div", { className: styles.stageIconCircle })),
                React.createElement(ChevronWhite, null),
                React.createElement(ChevronBlue, null)),
            React.createElement("h4", { className: styles.stageHeader }, getStageHeader(Stage.Finalized, stage, timings, status)),
            !hideDescriptions && (React.createElement("p", { className: styles.stageDesc }, "Origin transaction has sufficient confirmations"))),
        React.createElement("div", { className: styles.stageSpacer }),
        React.createElement("div", { className: styles.stageContainer },
            React.createElement("div", { className: `${styles.stageBar} ${getStageOpacityClass(Stage.Validated, stage, status)}` },
                React.createElement("div", { className: styles.stageHole }),
                React.createElement("div", { className: styles.stageIconContainer },
                    React.createElement(StageIcon, { Icon: ShieldIcon }),
                    React.createElement("div", { className: styles.stageIconCircle })),
                React.createElement(ChevronWhite, null),
                React.createElement(ChevronBlue, null)),
            React.createElement("h4", { className: styles.stageHeader }, getStageHeader(Stage.Validated, stage, timings, status)),
            !hideDescriptions && (React.createElement("p", { className: styles.stageDesc }, "Validators have signed the message bundle"))),
        React.createElement("div", { className: styles.stageSpacer }),
        React.createElement("div", { className: styles.stageContainer },
            React.createElement("div", { className: `${styles.stageBar} htw-rounded-r ${getStageOpacityClass(Stage.Relayed, stage, status)}` },
                React.createElement("div", { className: styles.stageHole }),
                React.createElement("div", { className: styles.stageIconContainer },
                    React.createElement(StageIcon, { Icon: EnvelopeIcon }),
                    React.createElement("div", { className: styles.stageIconCircle })),
                React.createElement(ChevronWhite, null)),
            React.createElement("h4", { className: styles.stageHeader }, getStageHeader(Stage.Relayed, stage, timings, status)),
            !hideDescriptions && (React.createElement("p", { className: styles.stageDesc }, "Destination transaction has been confirmed")))));
}
function StageIcon({ Icon, size }) {
    return (React.createElement("div", { className: "htw-h-9 htw-w-9 htw-flex htw-items-center htw-justify-center htw-rounded-full htw-bg-purple-900" },
        React.createElement(Icon, { width: size ?? 14, height: size ?? 14, alt: "", color: ColorPalette.White })));
}
function ChevronWhite() {
    return (React.createElement("div", { className: "htw-absolute htw--left-3 htw-top-0 htw-h-6" },
        React.createElement(WideChevronIcon, { direction: "e", height: "100%", width: "auto", color: "#ffffff" })));
}
function ChevronBlue() {
    return (React.createElement("div", { className: "htw-absolute htw--right-3 htw-top-0 htw-h-6" },
        React.createElement(WideChevronIcon, { direction: "e", height: "100%", width: "auto" })));
}
function getStageHeader(targetStage, currentStage, timings, status) {
    let label = '';
    if (targetStage === Stage.Finalized) {
        label = currentStage >= targetStage ? 'Finalized' : 'Finalizing';
    }
    else if (targetStage === Stage.Validated) {
        label = currentStage >= targetStage ? 'Validated' : 'Validating';
    }
    else if (targetStage === Stage.Relayed) {
        label = currentStage >= targetStage ? 'Relayed' : 'Relaying';
    }
    else if (targetStage === Stage.Sent) {
        label = currentStage >= targetStage ? 'Sent' : 'Sending';
    }
    const timing = timings[targetStage];
    if (status === MessageStatus.Failing) {
        if (targetStage === currentStage + 1)
            return `${label}: failed`;
        if (targetStage > currentStage + 1)
            return label;
    }
    if (timing)
        return `${label}: ${timing} sec`;
    else
        return label;
}
function getStageOpacityClass(targetStage, currentStage, messageStatus) {
    if (currentStage >= targetStage)
        return '';
    if (currentStage === targetStage - 1 &&
        messageStatus !== MessageStatus.Failing)
        return 'htw-animate-pulse-slow';
    return 'htw-opacity-50';
}
const styles = {
    stageContainer: 'htw-flex-1 htw-flex htw-flex-col htw-items-center',
    stageSpacer: 'htw-flex-0 htw-w-1 xs:htw-w-2 sm:htw-w-3',
    stageBar: 'htw-w-full htw-h-6 htw-flex htw-items-center htw-justify-center htw-bg-purple-900 htw-relative',
    stageHole: 'htw-w-3 htw-h-3 htw-rounded-full htw-bg-white',
    stageIconContainer: 'htw-absolute htw--top-12 htw-flex htw-flex-col htw-items-center',
    stageIconCircle: 'htw-w-0.5 htw-h-4 htw-bg-purple-900',
    stageHeader: 'htw-mt-2.5 htw-text-gray-700 htw-text-xs xs:htw-text-sm sm:htw-text-base',
    stageDesc: 'htw-mt-1 sm:htw-px-4 htw-text-xs htw-text-gray-500 htw-text-center',
};
//# sourceMappingURL=MessageTimeline.js.map