import React, { useEffect, useState } from 'react';
export function Fade(props) {
    const { show, children } = props;
    const [render, setRender] = useState(show);
    useEffect(() => {
        if (show)
            setRender(true);
    }, [show]);
    const onAnimationEnd = () => {
        if (!show)
            setRender(false);
    };
    return render ? (React.createElement("div", { style: {
            animationName: show ? 'fadeIn' : 'fadeOut',
            animationDuration: '1s',
            //https://github.com/radix-ui/primitives/issues/1074#issuecomment-1089555751
            animationFillMode: 'forwards',
        }, onAnimationEnd: onAnimationEnd }, children)) : null;
}
//# sourceMappingURL=Fade.js.map