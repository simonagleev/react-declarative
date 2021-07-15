
import IAnything from "../../../../model/IAnything";
import IColumn from "../../../../model/IColumn";
import IRowData from "../../../../model/IRowData";

export const DEFAULT_ROW_HEIGHT = 75;

const defaultPadding = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 17.5,
    paddingRight: 17.5,
};

const defaultStyle = {
    whiteSpace: "break-spaces",
    overflowWrap: "break-word",
    lineHeight: "20px",
    fontSize: '14px',
    fontWeight: '400',
    color: "black",
    border: "3px solid transparent",
    overflow: "hidden",
};

const defaultGetText = (field: string) => (row: Record<string, string>) => row[field];

export const createRowHeightHandler = <T extends IRowData = IAnything>({
    setHeight = (height) => console.log({height}),
    columns = [],
}: {
    setHeight?: (h: number) => void;
    columns?: IColumn[];
} = {}) => {
    const fields: any = columns.map(({ field }) => field);
    const widthMap: any = columns.reduce((acm, { field, width }) => ({ ...acm, [field]: { width } }), {});
    const paddingMap: any = columns.reduce((acm, { field, sizerCellPadding }) => ({ ...acm, [field]: sizerCellPadding || defaultPadding }), {});
    const getTextMap: any = columns.reduce((acm, { field, sizerGetText }) => ({ ...acm, [field]: sizerGetText || defaultGetText(field) }), {});
    const textStyleMap: any = columns.reduce((acm, { field, sizerCellStyle }) => ({ ...acm, [field]: sizerCellStyle || defaultStyle }), {});
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.left = `-${window.innerWidth}px`;
    div.style.zIndex = '9999';
    document.body.appendChild(div);
    return (rows: T[]) => {
        const maxRowHeight = Math.max(...rows.map((row) => {
            const contentRowHeight = Math.max(...fields.map((field: keyof T) => {
                Object.entries<any>(widthMap[field]).forEach(([k, v]) => div.style[k as any] = `${v}px`);
                Object.entries<any>(paddingMap[field]).forEach(([k, v]) => div.style[k as any] = `${v}px`);
                Object.entries<any>(textStyleMap[field]).forEach(([k, v]) => div.style[k as any] = v);
                div.innerText = getTextMap[field](row);
                const { height: boundingHeight } = div.getBoundingClientRect();
                return boundingHeight;
            }));
            const requiredRowHeight = Math.max(contentRowHeight, DEFAULT_ROW_HEIGHT);
            return Math.max(requiredRowHeight, DEFAULT_ROW_HEIGHT);
        }));
        setHeight && setHeight(maxRowHeight);
    };
};

export default createRowHeightHandler;