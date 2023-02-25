import { Box } from "@chakra-ui/react";

export function UCard({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Box bg="whiteAlpha.50" p="4">
      {children}
    </Box>
  );
}
