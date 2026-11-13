// Genera un patrón de huellas (SVG) para usar como `backgroundImage`.
// color: hex con el # codificado (ej. '%23C8E395'); opacity: 0 a 1.
export function buildPawPattern(color: string, opacity: number): string {
    const paw =
        "%3Cellipse cx='0' cy='10' rx='11' ry='9'/%3E" +
        "%3Ccircle cx='-13' cy='-4' r='4.5'/%3E" +
        "%3Ccircle cx='-5' cy='-11' r='4.5'/%3E" +
        "%3Ccircle cx='5' cy='-11' r='4.5'/%3E" +
        "%3Ccircle cx='13' cy='-4' r='4.5'/%3E";

    return (
        `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E` +
        `%3Cg fill='${color}' fill-opacity='${opacity}'%3E` +
        `%3Cg transform='translate(30 40) rotate(-18)'%3E${paw}%3C/g%3E` +
        `%3Cg transform='translate(110 115) rotate(20)'%3E${paw}%3C/g%3E` +
        `%3C/g%3E%3C/svg%3E")`
    );
}
