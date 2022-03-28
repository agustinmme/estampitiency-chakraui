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
import {useCart} from "./context";
import {currency} from "./utils";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.list().then(setProducts);
  }, []);

  const [{cart, quantity, total, message}, {addItem, incrementItem, decrementItem, removeAll}] =
    useCart();
  const {colorMode, toggleColorMode} = useColorMode();

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
            icon={colorMode === "dark" ? <HiSun color="yellow" /> : <HiMoon color="dark" />}
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
              {!cart.has(product.id) ? (
                <Button
                  colorScheme={"blue"}
                  onClick={() => addItem(product.id, {...product, quantity: 1})}
                >
                  Agregar
                </Button>
              ) : (
                <Flex alignItems={"center"} justifyContent={"center"}>
                  <Button
                    colorScheme={"blue"}
                    fontSize={"lg"}
                    roundedRight={0}
                    onClick={() => decrementItem(product.id)}
                  >
                    -
                  </Button>
                  <Text
                    alignItems={"center"}
                    bg={colorMode === "dark" ? "blue.200" : "blue.500"}
                    color={colorMode === "dark" ? "black" : "white"}
                    display={"flex"}
                    flex={1}
                    h={"100%"}
                    justifyContent={"center"}
                  >
                    {cart.get(product.id)?.quantity}
                  </Text>
                  <Button
                    colorScheme={"blue"}
                    fontSize={"lg"}
                    roundedLeft={0}
                    onClick={() => incrementItem(product.id)}
                  >
                    +
                  </Button>
                </Flex>
              )}
            </Stack>
          ))}
        </Grid>
        <Box bottom={0} margin={"auto"} paddingBottom={"16px"} position={"sticky"}>
          {Boolean(quantity) && (
            <Flex>
              <Link isExternal href={message} style={{textDecoration: "none"}}>
                <Button colorScheme={"whatsapp"} maxW={"320px"} mx={"auto"} p={3} roundedRight={0}>
                  {quantity} productos (total: {currency(total)})
                </Button>
              </Link>
              <Button
                colorScheme={"whatsapp"}
                maxW={"320px"}
                mx={"auto"}
                p={3}
                roundedLeft={0}
                onClick={() => removeAll()}
              >
                X
              </Button>
            </Flex>
          )}
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
