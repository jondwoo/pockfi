/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import {
  ArrowBackIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Collapse,
  Container,
  Flex,
  Hide,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';

interface NavItem {
  label: string;
  subLabel?: string;
  children?: NavItem[];
  href?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Inspiration',
    children: [
      {
        label: 'Explore Design Work',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'New & Noteworthy',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
    ],
  },
  {
    label: 'Find Work',
    children: [
      {
        label: 'Job Board',
        subLabel: 'Find your dream design job',
        href: '#',
      },
      {
        label: 'Freelance Projects',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
    ],
  },
  {
    label: 'Learn Design',
    href: '#',
  },
  {
    label: 'Hire Designers',
    href: '#',
  },
];

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role="group"
      display="block"
      p={2}
      rounded="md"
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction="row" align="center">
        <Box>
          <Text
            transition="all .3s ease"
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize="sm">{subLabel}</Text>
        </Box>
        <Flex
          transition="all .3s ease"
          transform="translateX(-10px)"
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify="flex-end"
          align="center"
          flex={1}
        >
          <Icon color="pink.400" w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const { data: session } = useSession();

  return (
    <Stack direction="row" spacing={4}>
      {session &&
        NAV_ITEMS.map(navItem => (
          <Box key={navItem.label}>
            <Popover trigger="hover" placement="bottom-start">
              <PopoverTrigger>
                <Link
                  p={2}
                  href={navItem.href ?? '#'}
                  fontSize="sm"
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Link>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow="xl"
                  bg={popoverContentBgColor}
                  p={4}
                  rounded="xl"
                  minW="sm"
                >
                  <Stack>
                    {navItem.children.map(child => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition="all .25s ease-in-out"
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align="start"
        >
          {children &&
            children.map(child => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { data: session } = useSession();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container maxW="8xl">
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH="60px"
          py={{ base: 2 }}
          px={{ base: 4 }}
          align="center"
        >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Hide below="md">
              <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily="heading"
                color={useColorModeValue('gray.800', 'white')}
              >
                PockFi
              </Text>
            </Hide>

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify="flex-end"
            direction="row"
            spacing={6}
          >
            {session && (
              <Menu>
                <MenuButton>
                  <HStack>
                    <Avatar size="sm" src="https://bit.ly/broken-link" />
                    <ChevronDownIcon />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<SettingsIcon />}>Account Settings</MenuItem>
                  <Hide above="md">
                    <MenuItem
                      closeOnSelect={false}
                      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                      onClick={toggleColorMode}
                    >
                      Toggle Theme
                    </MenuItem>
                  </Hide>
                  <MenuDivider />
                  <MenuItem icon={<ArrowBackIcon />} onClick={() => signOut()}>
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            )}

            <Hide below="md">
              <IconButton
                bg={useColorModeValue('white', 'gray.800')}
                onClick={toggleColorMode}
                aria-label="Toggle Theme"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              />
            </Hide>
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Container>
    </Box>
  );
};

export default Navbar;
