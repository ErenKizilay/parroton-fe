import { Flex, Typography } from "antd";
import { useState } from "react";

interface CodeComponentProps2 {
    data: any;
    copyable?: boolean;
}

const CodeComponent2: React.FC<CodeComponentProps2> = ({
    data,
    copyable = true,
}) => {
    const [expanded, setExpanded] = useState(false);

    const formatData = (input: any): string => {
        if (typeof input === "string") {
            return input.startsWith("$.")
                ? input
                    .split(".")
                    .map((part, i) => (i % 2 === 0 && i !== 0 ? `\n\t${part}` : part))
                    .join(".")
                : input;
        }
        try {
            return JSON.stringify(input, null, 2);
        } catch (error) {
            return String(input);
        }
    };

    const codeTextAreaStyles: React.CSSProperties = {
        fontFamily: `"Fira Code", "Courier New", Courier, monospace`,
        fontSize: "14px", // Readable code size
        backgroundColor: "#e0e0e0", // Light gray background
        color: "#000", // Black text for strong contrast
        fontWeight: "bold", // Make text bold
        border: "1px solid #bdbdbd", // Softer border for a cleaner look
        borderRadius: "6px", // Slightly rounded corners
        padding: "12px", // Spacing for better readability
        lineHeight: "1.6",
        whiteSpace: "pre", // Preserve code formatting
        wordBreak: "break-word",
        overflowX: "auto", // Enable horizontal scrolling
        overflowY: "auto", // Enable vertical scrolling if needed
        maxWidth: "100%",
        width: "100%",
        minWidth: "100px",
        maxHeight: expanded ? "none" : "400px", // Expand when needed
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
        cursor: "text", // Use text cursor
    };

    return (
        data === '-' ? '' :
            <Flex style={{ width: "100%" }}>
                <Typography.Text
                    copyable={copyable}
                    style={codeTextAreaStyles}
                    onClick={() => setExpanded(!expanded)}
                >
                    {formatData(data)}
                </Typography.Text>
            </Flex>
    );
};

export default CodeComponent2;
