export var ColorPalette;
(function (ColorPalette) {
    ColorPalette["Black"] = "#010101";
    ColorPalette["White"] = "#FFFFFF";
    ColorPalette["Blue"] = "#581C87";
    ColorPalette["DarkBlue"] = "#162A4A";
    ColorPalette["LightBlue"] = "#82A8E4";
    ColorPalette["Pink"] = "#CF2FB3";
    ColorPalette["LightGray"] = "#D3D4D7";
    ColorPalette["Gray"] = "#6B7280";
    ColorPalette["Beige"] = "#F1EDE9";
    ColorPalette["Red"] = "#BF1B15";
})(ColorPalette || (ColorPalette = {}));
export function seedToBgColor(seed) {
    if (!seed)
        return 'htw-bg-gray-100';
    const mod = seed % 5;
    switch (mod) {
        case 0:
            return 'htw-bg-blue-100';
        case 1:
            return 'htw-bg-pink-200';
        case 2:
            return 'htw-bg-green-100';
        case 3:
            return 'htw-bg-orange-200';
        case 4:
            return 'htw-bg-violet-200';
        default:
            return 'htw-bg-gray-100';
    }
}
//# sourceMappingURL=color.js.map