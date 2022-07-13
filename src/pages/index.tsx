import {
  Button,
  Center,
  Container,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading')
    return (
      <Center h="calc(100vh - 60px)" color="pink.400">
        <Spinner />
      </Center>
    );

  return (
    <>
      <Head>
        <title>PockFi</title>
        <meta name="description" content="PockFi - Your Pocket Finance App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container h="calc(100vh - 60px)" maxW="container.xl" centerContent>
        <VStack my="auto">
          {!session && (
            <>
              <Heading size="lg">Log in to your account</Heading>
              <Text fontSize="sm" pb={5}>
                You don't need a password. It's safer that way.
              </Text>
              <Button
                onClick={() => signIn('google')}
                as="a"
                fontSize="sm"
                fontWeight={600}
                bg="pink.400"
                color="white"
                _hover={{
                  bg: 'pink.300',
                }}
              >
                Sign in with Google
              </Button>
            </>
          )}
          {session && <h1>test</h1>}
        </VStack>
      </Container>
    </>
  );
};

export default Home;
