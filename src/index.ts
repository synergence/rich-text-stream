type FontNames = keyof ExcludeMembers<{[R in keyof typeof Enum.Font]: (typeof Enum.Font)[R] extends { Name: string } ? (typeof Enum.Font)[R] : never }, string>;

/**
 * A rich text creator
 */
class RichTextStream {
	private workingString: Array<string> = [];

	public constructor() {
		const metaTable = getmetatable(this) as LuaMetatable<this>;
		metaTable.__tostring = function(stream) {
			return stream.toString();
		}

		setmetatable(this, metaTable);
	}

	/**
	 * Convert the stream to a string
	 */
	public toString() {
		return this.workingString.join('');
	}

	/**
	 * Adds a text to the end of the stream
	 * @param text The text to add
	 */
	public a(text: string) {
		this.workingString.push(text);
		return this;
	}

	/**
	 * Bolds the text
	 */
	public b() {
		this.workingString[this.workingString.size() - 1] = `<b>${this.workingString[this.workingString.size() - 1]}</b>`;
		return this;
	}

	/**
	 * Italicizes the text
	 */
	public i() {
		this.workingString[this.workingString.size() - 1] = `<i>${this.workingString[this.workingString.size() - 1]}</i>`;
		return this;
	}

	/**
	 * Underlines the text
	 */
	public u() {
		this.workingString[this.workingString.size() - 1] = `<u>${this.workingString[this.workingString.size() - 1]}</u>`;
		return this;
	}

	/**
	 * Strikethroughs the text
	 */
	public s() {
		this.workingString[this.workingString.size() - 1] = `<s>${this.workingString[this.workingString.size() - 1]}</s>`;
		return this;
	}

	/**
	 * Changes the font size
	 * @param size The size of the text
	 */
	public fs(size: number) {
		this.workingString[this.workingString.size() - 1] = `<font size="${size}">${this.workingString[this.workingString.size() - 1]}</font>`;
		return this;
	}

	/**
	 * Changes the font face
	 * @param face The font face
	 */
	public ff(face: FontNames) {
		this.workingString[this.workingString.size() - 1] = `<font face="${face}">${this.workingString[this.workingString.size() - 1]}</font>`;
		return this;
	}

	/**
	 * Changes the font face
	 * @param face The font face
	 */
	 public ffe(face: Enum.Font) {
		this.workingString[this.workingString.size() - 1] = `<font face="${face.Name}">${this.workingString[this.workingString.size() - 1]}</font>`;
		return this;
	}

	/**
	 * Changes the font color (base)
	 * @param color The font color
	 *
	 * @example
	 * fc('#ffffff')
	 * fc('rgb(255,255,255)')
	 */
	public fc(color: `#${string}` | `rgb(${number},${number},${number})`) {
		this.workingString[this.workingString.size() - 1] = `<font color="${color}">${this.workingString[this.workingString.size() - 1]}</font>`;
		return this;
	}

	/**
	 * Changes the font color (hex)
	 * @param color The hex font color
	 *
	 * @example
	 * fch('ffffff')
	 */
	public fch(color: string) {
		this.workingString[this.workingString.size() - 1] = `<font color="#${color}">${this.workingString[this.workingString.size() - 1]}</font>`;
		return this;
	}

	/**
	 * Changes the font color (Color3)
	 * @param color The Color3 color
	 */
	public fc3(color: Color3) {
		this.workingString[this.workingString.size() - 1] = `<font color="rgb(${color.R},${color.G},${color.B})">${this.workingString[this.workingString.size() - 1]}</font>`;
		return this;
	}

	/**
	 * Changes the font color (3 inputs)
	 * @param r The red value
	 * @param g The green value
	 * @param b The blue value
	 */
	public fc3i(r: number, g: number, b: number) {
		this.workingString[this.workingString.size() - 1] = `<font color="rgb(${r},${g},${b})">${this.workingString[this.workingString.size() - 1]}</font>`;
		return this;
	}

	/**
	 * Creates a new line
	 */
	public br() {
		this.workingString[this.workingString.size() - 1] = `${this.workingString[this.workingString.size() - 1]}<br />`;
		return this;
	}

	/**
	 * Make the text smallcaps
	 */
	public sc() {
		this.workingString[this.workingString.size() - 1] = `<sc>${this.workingString[this.workingString.size() - 1]}</sc>`;
		return this;
	}
}

/**
 * Create a rich text stream
 * @returns RichTextStream
 *
 * @example
 * rich().a('Hello, ').b().fc('#ff0000').a('world!').i();
 * // <b><font color="#ff0000">Hello, </font></b><i>world!</i>
 */
export default function rich(starting?: string) {
	const stream = new RichTextStream();
	if (starting !== undefined) stream.a(starting);
	return stream;
}