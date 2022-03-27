import {
  Box,
  Flex,
  Grid,
  Heading,
  Link,
  Stack,
  Image,
  Text,
  Button,
  IconButton,
  useColorMode,
  Container,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {HiSun, HiMoon} from "react-icons/hi";

import api from "./api";
import {Product} from "./types";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.list().then(setProducts);
  }, []);
  const {colorMode, toggleColorMode} = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Container boxShadow={"xl"} m={"auto"} maxW="container.xl" minH={"100vh"}>
      <Box display={"flex"} flexDirection="column" justifyContent={"space-beetwen"}>
        <Stack
          isInline
          borderBottom={"1px solid gainsboro"}
          justifyContent={"space-between"}
          padding={"16px"}
        >
          <Heading>Estampitiency</Heading>
          <IconButton
            isRound
            aria-label="Theme color"
            borderWidth={"1px"}
            icon={isDark ? <HiSun color="yellow" /> : <HiMoon color="dark" />}
            m={1}
            ml={8}
            onClick={toggleColorMode}
          />
        </Stack>
        <Grid gridGap={8} p={"16px"} templateColumns={"repeat(auto-fill, minmax(320px, 1fr))"}>
          {products.map((product) => (
            <Stack key={product.id} gap={3}>
              <Image objectFit={"contain"} src={product.image} width={"100%"} />
              <Flex flex={1} flexDirection={"column"} gap={"6px"} h={"100%"}>
                <Text>{product.title}</Text>
                <Text>{product.description}</Text>
              </Flex>
              <Button colorScheme={"blue"}>Agregar</Button>
            </Stack>
          ))}
        </Grid>
        <Box bottom={0} margin={"auto"} paddingBottom={"16px"} position={"sticky"}>
          <Button colorScheme={"whatsapp"} maxW={"200px"} mx={"auto"} p={3}>
            3 productos (total: $12)
          </Button>
        </Box>
        <Box borderTop={"1px solid gainsboro"} p={"16px"} textAlign={"center"}>
          Encontrá la consigna de este ejercicio y otros más{" "}
          <Link
            isExternal
            fontWeight={"bold"}
            href="https://github.com/goncy/interview-challenges/tree/main/simple-cart"
          >
            acá
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
