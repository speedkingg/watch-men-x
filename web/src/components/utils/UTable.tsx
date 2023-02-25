import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { JsonOneDepth } from "../../types/utilType";

export function UTable({
  headers,
  valuesList,
}: {
  headers: string[];
  valuesList: JsonOneDepth[];
}): JSX.Element {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {headers.map((header: string, index: number) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {valuesList.map((values: JsonOneDepth, index: number) => (
            <Tr
              key={index}
              _hover={{
                background: "whiteAlpha.300",
              }}
            >
              {Object.values(values).map(
                (value: string | number, index: number) => (
                  <Td key={index}>{value}</Td>
                )
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
