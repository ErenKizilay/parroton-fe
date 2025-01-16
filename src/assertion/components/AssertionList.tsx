import { Collapse, Flex } from "antd";
import DataLoaderComponent from "../../common/components/DataLoaderComponent";
import { useAssertionsQuery } from "../hooks/assertionHooks";
import AssertionComponent from "./AssertionComponent";
import AssertionSummary from "./AssertionSummary";

export interface AssertionListProps {
    test_case_id: string
}

export default function AssertionList({ test_case_id }: AssertionListProps) {
    const { data, isLoading, error } = useAssertionsQuery(test_case_id);

    const assertions = (): React.ReactNode => {
        const items = data?.items.map(a => {
            return {
                key: a.id,
                label: <AssertionSummary assertion={a} result={undefined}/>,
                children: <AssertionComponent key={a.id} test_case_id={test_case_id} assertion={a} />
            }
        });
        return <Collapse items={items} />
    }

    return <DataLoaderComponent isLoading={isLoading} error={error} render={assertions} />
}