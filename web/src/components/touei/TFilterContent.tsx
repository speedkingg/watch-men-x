import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
} from "@chakra-ui/react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Filter } from "../../hooks/useFilter";

const headerWidth = 170;

export function TFilterContent({
  filter,
  setFilter,
  applyFilter,
  resetFilter,
  tagList,
}: {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  applyFilter: VoidFunction;
  resetFilter: VoidFunction;
  tagList: Set<string>;
}): JSX.Element {
  const toggleFilter = (tag: string) => {
    setFilter((state) => ({
      ...state,
      タグ: filter.タグ.includes(tag)
        ? state.タグ.filter((t: string) => t !== tag)
        : state.タグ.concat([tag]),
    }));
  };

  return (
    <Flex direction="column" p={8} gap={8}>
      <Flex gap={4} mb={8}>
        <FontAwesomeIcon icon={faFilter} size="2x" />
        <Heading gap={4}>フィルター</Heading>
      </Flex>

      <Flex>
        <Heading size="md" mr={8} w={headerWidth}>
          アクセス:
        </Heading>
        <Checkbox
          size="lg"
          colorScheme="teal"
          onChange={(e) =>
            setFilter((state: Filter) => ({
              ...state,
              バスを含まない: e.target.checked,
            }))
          }
          isChecked={filter.バスを含まない}
        >
          バスを含まない
        </Checkbox>
      </Flex>

      <Flex>
        <Heading size="md" mr={8} w={headerWidth}>
          接道:
        </Heading>
        <Checkbox
          size="lg"
          colorScheme="teal"
          onChange={(e) =>
            setFilter((state: Filter) => ({
              ...state,
              公道のみ: e.target.checked,
            }))
          }
          isChecked={filter.公道のみ}
        >
          公道のみ
        </Checkbox>
      </Flex>

      <Flex>
        <Heading size="md" mr={8} w={headerWidth}>
          駅徒歩:
        </Heading>
        <NumberInput
          value={filter.駅徒歩X分以内}
          onChange={(s, n) =>
            setFilter((state: Filter) => ({
              ...state,
              駅徒歩X分以内: s === "" ? 0 : Number(n),
            }))
          }
          min={0}
          max={100}
          w={100}
          color={filter.駅徒歩X分以内 ? "" : "GrayText"}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Box my="auto" ml={2}>
          分以内
        </Box>
      </Flex>

      <Flex>
        <Heading size="md" mr={8} w={headerWidth}>
          予算:
        </Heading>
        <NumberInput
          value={filter.予算}
          onChange={(s, n) =>
            setFilter((state: Filter) => ({
              ...state,
              予算: s === "" ? 0 : Number(n),
            }))
          }
          min={0}
          max={20000}
          step={1000}
          w={100}
          color={filter.予算 ? "" : "GrayText"}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Box my="auto" ml={2}>
          万円
        </Box>
      </Flex>

      <Flex>
        <Heading size="md" mr={8} w={headerWidth}>
          フリーテキスト:
        </Heading>
        <Input
          value={filter.フリーテキスト}
          onChange={(e) =>
            setFilter((state: Filter) => ({
              ...state,
              フリーテキスト: e.target.value,
            }))
          }
          w={300}
        />
      </Flex>

      <Flex direction="column">
        <Heading size="md" mb={4}>
          タグ:
        </Heading>
        <Flex wrap="wrap" gap={1}>
          {Array.from(tagList)
            .sort()
            .map((tag: string) => (
              <Button
                size="sm"
                key={tag}
                onClick={() => toggleFilter(tag)}
                colorScheme={filter.タグ.includes(tag) ? "teal" : "gray"}
              >
                {tag}
              </Button>
            ))}
        </Flex>
      </Flex>

      <Divider mt={8} mb={4} />
      <Flex>
        <Button onClick={resetFilter}>リセット</Button>
        <Spacer />
        <Button colorScheme="teal" onClick={applyFilter}>
          適用
        </Button>
      </Flex>
    </Flex>
  );
}
