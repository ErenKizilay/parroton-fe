import { Spin, Typography } from "antd";

export interface Props {
    start: Date | string
    end: Date | string | null
}

export default function Duration({ start, end }: Props) {

    const castToString = (value: Date | string | null): string => {
        if (value === null) {
            return ""; // Default to an empty string for null values
        }
        if (value instanceof Date) {
            return value.toISOString(); // Convert Date to ISO string
        }
        return value; // Already a string
    };

    const getDuration = (date1: string, date2: string): number => {
        const asDate1 = new Date(date1);
        const asDate2 = new Date(date2);
        return asDate2.getTime() - asDate1.getTime()
    }

    const formatTime = (time: number) => {
        if (time <= 2000) {
            return `${time} ms`;
        }
        return `${(time / 1000).toFixed(1)} s`;
    };

    return <>
        {end ? <Typography.Text strong>
            Duration: {formatTime(getDuration(castToString(start), castToString(end)))}
        </Typography.Text> : <Spin></Spin>}
    </>
}