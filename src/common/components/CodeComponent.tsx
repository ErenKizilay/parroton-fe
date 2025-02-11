import Paragraph from "antd/es/typography/Paragraph";
import { useState } from "react";

interface CodeComponentProps {
    data: any;
    onEdit?: (value: string) => void
}

const CodeComponent: React.FC<CodeComponentProps> = ({
    data, onEdit
}) => {
    const [expanded, setExpanded] = useState(false);
    const formatData = (input: any): string => {
        if (typeof input === "string") {
            return input;
        }
        try {
            return JSON.stringify(input, null, 2);
        } catch (error) {
            return String(input);
        }
    };

    return (
        <Paragraph
            ellipsis={{
                rows: 10,
                expandable: 'collapsible',
                expanded: expanded,
                onExpand: (_, info) => setExpanded(info.expanded),
            }}
            copyable
            editable={{ editing: onEdit ? true : false, autoSize: { minRows: 1, maxRows: 10 }, onChange: (e) => {
                onEdit ? (e) : '';
            } }}
            style={{
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
                backgroundColor: "#f6f8fa",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #d9d9d9",
            }}
        >
            {formatData(data)}
        </Paragraph>
    );
};

export default CodeComponent;