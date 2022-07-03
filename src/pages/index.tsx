import { Container, Heading, Text, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Expense Splitter</title>
        <meta name="description" content="App to split expenses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container h="100vh" maxW="container.xl" centerContent>
        <VStack my="auto">
          {!session && (
            <>
              <Heading size="lg">Log in to your account</Heading>
              <Text fontSize="sm" pb={5}>
                You don't need a password. It's safer that way.
              </Text>
            </>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default Home;
