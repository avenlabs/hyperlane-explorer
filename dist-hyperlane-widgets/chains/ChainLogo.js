import React, { useEffect, useState } from 'react';
import { Circle } from '../icons/Circle.js';
import { QuestionMarkIcon } from '../icons/QuestionMark.js';
import { widgetLogger } from '../logger.js';
export function ChainLogo({ chainName, logoUri, registry, size = 32, background = false, Icon, }) {
    const title = chainName || 'Unknown';
    const bgColorSeed = title.charCodeAt(0);
    const iconSize = Math.floor(size / 1.9);
    const [svgLogos, setSvgLogos] = useState({});
    const uri = logoUri || svgLogos[chainName];
    useEffect(() => {
        if (!chainName || svgLogos[chainName] || logoUri || Icon || !registry)
            return;
        registry
            .getChainLogoUri(chainName)
            .then((uri) => uri && setSvgLogos({ ...svgLogos, [chainName]: uri }))
            .catch((err) => widgetLogger.error('Error fetching log uri', err));
    }, [chainName, logoUri, registry, svgLogos, Icon]);
    if (!uri && !Icon) {
        return (React.createElement(Circle, { size: size, title: title, bgColorSeed: bgColorSeed }, chainName ? (React.createElement("div", { style: { fontSize: iconSize } }, chainName[0].toUpperCase())) : (React.createElement(QuestionMarkIcon, { width: iconSize, height: iconSize }))));
    }
    if (background) {
        return (React.createElement(Circle, { size: size, title: title, className: "htw-bg-gray-100" }, Icon ? (React.createElement(Icon, { width: iconSize, height: iconSize, title: title })) : (React.createElement("img", { src: uri, alt: title, width: iconSize, height: iconSize }))));
    }
    else {
        return Icon ? (React.createElement(Icon, { width: size, height: size, title: title })) : (React.createElement("img", { src: uri, alt: title, width: size, height: size }));
    }
}
//# sourceMappingURL=ChainLogo.js.map