import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useLogin } from "../hooks/useLogin";

export function Login(): JSX.Element {
  const { mail, pass, changeMail, changePass, execLogin } = useLogin();
  return (
    <>
      <Center mt="200px">
        <Heading size="4xl">Watch-Men</Heading>
      </Center>
      <Center
        bg="blackAlpha.400"
        h="300"
        mx="auto"
        mt="50"
        p="30"
        w="300px"
        borderRadius="md"
      >
        <Flex direction="column">
          <FormControl mb="10px">
            <FormLabel>id</FormLabel>
            <Input type="email" value={mail} onChange={changeMail} />
          </FormControl>

          <FormControl mb="50px">
            <FormLabel>pass</FormLabel>
            <Input type="password" value={pass} onChange={changePass} />
          </FormControl>

          <Button colorScheme="teal" onClick={execLogin}>
            Login
          </Button>
        </Flex>
      </Center>
    </>
  );
}
