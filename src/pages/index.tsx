import { Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { signOut, useSession } from 'next-auth/react';

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
          <Heading size="lg">Log in to your account</Heading>
          <Text fontSize="sm" pb={5}>
            You don't need a password. It's safer that way.
          </Text>
          {!session ? (
            <NextLink href="/api/auth/signin" passHref>
              <Button w="full" variant="outline" as="a">
                Continue with Google
              </Button>
            </NextLink>
          ) : (
            <Button onClick={() => signOut()}>Logout</Button>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default Home;
