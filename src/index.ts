type FontNames = keyof ExcludeMembers<{[R in keyof typeof Enum.Font]: (typeof Enum.Font)[R] extends { Name: string } ? (typeof Enum.Font)[R] : never }, string>;

interface RichTextNode {
	text: string;
	attributes: Map<string, Array<string> | undefined>;
}

/**
 * A rich text creator
 */
class RichTextStream {
	private workingString: Array<RichTextNode> = [];

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
		return this.workingString.map(node => {
			let text = node.text;

			for (const [attribute, properties] of node.attributes) {
				if (!properties) {
					text = `<${attribute}>${text}</${attribute}>`;
					continue;
				}

				text = `<${attribute} ${properties.join(' ')}>${text}</${attribute}>`;
			}

			return text;
		}).join('');
	}

	/**
	 * Adds a text to the end of the stream
	 * @param text The text to add
	 */
	public add(text: string) {
		this.workingString.push({
			text,
			attributes: new Map()
		});

		return this;
	}

	private lastString() {
		return this.workingString[this.workingString.size() - 1];
	}

	private appendAttributeParameter(attribute: string, modifier: string, value: string) {
		const lastString = this.lastString();
		lastString.attributes.set(attribute, [...(lastString.attributes.get(attribute) || []), `${modifier}="${value}"`]);
	}

	/**
	 * Bolds the text
	 */
	public bold() {
		this.lastString().attributes.set('b', undefined);
		return this;
	}

	/**
	 * Italicizes the text
	 */
	public italic() {
		this.lastString().attributes.set('i', undefined);
		return this;
	}

	/**
	 * Underlines the text
	 */
	public underline() {
		this.lastString().attributes.set('u', undefined);
		return this;
	}

	/**
	 * Strikethroughs the text
	 */
	public strikethrough() {
		this.lastString().attributes.set('s', undefined);
		return this;
	}

	/**
	 * Changes the font size
	 * @param size The size of the text
	 */
	public fontSize(size: number) {
		this.appendAttributeParameter('font', 'size', tostring(size));
		return this;
	}

	/**
	 * Changes the font face
	 * @param face The font face
	 */
	public fontFace(face: FontNames) {
		this.appendAttributeParameter('font', 'face', face);
		return this;
	}

	/**
	 * Changes the font face
	 * @param face The font face
	 */
	 public fontFaceEnum(face: Enum.Font) {
		this.appendAttributeParameter('font', 'face', face.Name);
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
	public fontColor(color: `#${string}` | `rgb(${number},${number},${number})`) {
		this.appendAttributeParameter('font', 'color', color);
		return this;
	}

	/**
	 * Changes the font color (hex)
	 * @param color The hex font color
	 *
	 * @example
	 * fch('ffffff')
	 */
	public fontColorHex(color: string) {
		this.appendAttributeParameter('font', 'color', `#${color}`);
		return this;
	}

	/**
	 * Changes the font color (Color3)
	 * @param color The Color3 color
	 */
	public fontColor3(color: Color3) {
		this.appendAttributeParameter('font', 'color', `rgb(${color.R},${color.G},${color.B})`);
		return this;
	}

	/**
	 * Changes the font color (3 inputs)
	 * @param r The red value
	 * @param g The green value
	 * @param b The blue value
	 */
	public fontColor3Input(r: number, g: number, b: number) {
		this.appendAttributeParameter('font', 'color', `rgb(${r},${g},${b})`);
		return this;
	}

	/**
	 * Creates a new line.
	 *
	 * This is a macro for .add('<br />'), so this will count as a new modifying element
	 */
	public breakLine() {
		this.add('<br />');
		return this;
	}

	/**
	 * Make the text smallcaps
	 */
	public smallCaps() {
		this.lastString().attributes.set('sc', undefined);
		return this;
	}
}

/**
 * Create a rich text stream
 * @returns RichTextStream
 *
 * @example
 * const output = rich()
 *    .add('Hello, ')
 *        .bold()
 *        .fontColor('#ff0000')
 *    .add('world!')
 *        .italics();
 */
export default function rich(starting?: string) {
	const stream = new RichTextStream();
	if (starting !== undefined) stream.add(starting);
	return stream;
}