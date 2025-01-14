
import { Flex, Input, Typography } from 'antd';
import { useState } from "react";

const { TextArea } = Input;

interface CodeComponentProps2 {
    data: any;
}

const CodeComponent2: React.FC<CodeComponentProps2> = ({
    data
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

    const codeTextAreaStyles: React.CSSProperties = {
        fontFamily: `"Fira Code", "Courier New", Courier, monospace`, // Monospaced font for JSON readability
        backgroundColor: "#f5f5f5", // Light grey background for better contrast
        color: "#333", // Darker text for improved readability
        fontWeight: "bold", // Bold text for emphasis
        border: "1px solid #d9d9d9", // Subtle border
        borderRadius: "4px", // Rounded corners
        padding: "10px", // Padding for readability
        lineHeight: "1.6", // Increased line spacing for JSON formatting
        whiteSpace: "pre-wrap", // Preserve whitespace and wrap long lines
        wordWrap: "break-word", // Wrap text instead of horizontal scrolling
        resize: "none", // Disable manual resizing,
        width: "100%", // Take full width of the container
        maxWidth: "1500px", // Limit the width to prevent overflow,
        flex: 1
    };

    return (
        <Flex flex={1}>
            <Typography.Paragraph 
            ellipsis={{  
                expandable: "collapsible",
                expanded,
                onExpand: (_, info) => setExpanded(info.expanded),
                rows: 10
            }} copyable style={codeTextAreaStyles}>{formatData(data)}</Typography.Paragraph>
        </Flex>
    );
};

export default CodeComponent2;