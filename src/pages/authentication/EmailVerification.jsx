import React, { Component } from 'react';
import { GridItem, Container,InputGroup,Button,InputLeftElement,Input,Tag,Box, Flex, Grid, Image, Tab, Tabs, TabPanel, TabPanels, TabList } from '@chakra-ui/react';
import styled from "styled-components";
import CirclepassLogo from '../../assets/images/CirclepassLogo.png';
import SignIn from './SignIn';
import AccountCredentials from './AccountCredentials';
import VerificationCompleted from './VerificationCompleted';
import EmailConfrimation from './EmailConfrimation';

const LeftSideWrapper = styled.section `
    display: flex;
    width: 50%;
    background-color: #F4F1F4;
    padding: 32px 16px 16px;
    gap: 16px;
    justify-content: center;
    top: 32px;
`
const RightSideWrapper = styled.section`
    background-color: #3372f0;
    width: 50%;
    
`

const CirclepassLogoWrapper = styled.section`
    display: flex;
    width: 200px;
    justify-content: center;
    height: 56.58px;
`

// const AuthWrapper = styled.section`
// width: 75px;
// height: 24px;

// font-family: 'Lucida Sans';
// font-style: normal;
// font-weight: 400;
// font-size: 16px;
// line-height: 24px;
// display: flex;
// align-items: center;
// letter-spacing: 0.02em;
// color: #2A69AC;
// opacity: 0.5;
// flex: none;
// order: 0;
// flex-grow: 0;
// `

const TextWrapper = styled.section`

font-family: 'Lucida Sans';
font-style: normal;
font-size: 14px;
color: #001011;
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
width: 564px;
height: 40px;
font-weight: 400;
line-height: 20px;
letter-spacing: 0.02em;
`

const EmailAddressWrapper = styled.section`
width: 564px;
height: 24px;

margin-top:24px;
/* margin-left:40px; */
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 24px;
letter-spacing: 0.02em;
color: #001011;

flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
`
const EmailConfirmationText = styled.section`
margin-top:8px;
width: 564px;
height: 16px;

/* Circle Pass (+Teams)/text/xs */

font-family: 'Lucida Sans Unicode';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
/* identical to box height, or 133% */

letter-spacing: 0.01em;

/* gray/500 */

color: #718096;


/* Inside auto layout */

flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
`

const FooterWrapper = styled.section`
/* Auto layout */

display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 16px;

width: 684px;
height: 92px;


/* Inside auto layout */

flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;
`

const TabStepsWrapper = styled.section`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 684px;
height: 56px;


/* Inside auto layout */

flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
`

const TitleOfSteps = styled.section`
width: 165px;
height: 20px;


/* Circle Pass (+Teams)/text/md */

font-family: 'Lucida Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

letter-spacing: 0.02em;

/* Circle Pass/CP Dark BG */

color: #001011;


/* Inside auto layout */

display:flex;
order: 1;
align-self: stretch;
flex-grow: 0;`

export class EmailVerification extends Component {
  render() {
    return (
    <>
     <Flex flexDirection="row">
        <LeftSideWrapper >
            <Grid
                templateAreas={`"header header"
                "nav main"
                "nav footer"`}
                gridTemplateRows={'90px 1fr 30px'}
            >
                <GridItem
                    pl='2' area={'header'}
                    display='flex' justifyContent='center'>
                    <CirclepassLogoWrapper>
                        <Image src={CirclepassLogo} />
                    </CirclepassLogoWrapper>
                </GridItem>
                <Box>
                <GridItem
                    pl='2' area={"main"}
                >
                    <Tabs>
                        <TabList>
                            <Tab size='16px' fontFamily='Lucida Sans' lineHeight='24px' w='22.5vw'>REGISTER</Tab>
                            <Tab size='16px' lineHeight='24px' w='22.5vw'>SIGN IN</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                            <Container maxW='container.lg' marginTop='35px'>
            <Box>
                <TextWrapper>
                    Create a CirclePass account to start using our apps and services
                </TextWrapper>
                <TextWrapper>
                We have sent an email to alhasan.mhd.ali@gmail.com, please copy the activation code here to activate your account.
                </TextWrapper>
            </Box>
            <Box marginTop={'20px'}>
                <EmailAddressWrapper>
                    Verification Code
                </EmailAddressWrapper>
                <InputGroup marginTop={'10px'}>
                    <InputLeftElement
                        pointerEvents='none'
                    >
                    <Tag
                        size="20"
                        color='#A3A3A3' />
                    </InputLeftElement>
                <Input w='75%' bgColor='#ffffff' placeholder='123456' />
                </InputGroup>
                <EmailConfirmationText>
                    Enter the 6-digits verification code you have received.
                </EmailConfirmationText>
            </Box>
            <Box display={'flex'} justifyContent={'center'} marginTop={'30px'}>
                <Button marginRight={'10%'} colorScheme='blue'>Button</Button>
            </Box>
            </Container>
            <Box bottom={'30px'} position='absolute'>
            <FooterWrapper>
                <TextWrapper>
                Verify your email address to continue to create a new account
                </TextWrapper>
            <TabStepsWrapper >
            <Tabs >
                <TabList >
                    <Tab alignItems={'flex-start'} flexDirection={'column'} fontSize={'12px'} color={'#00A0E9'} lineHeight={'16px'} fontFamily={'Lucida Sans Unicode'}>STEP 1 <TitleOfSteps>Contact Details</TitleOfSteps>                    </Tab>
                    <Tab alignItems={'flex-start'} flexDirection={'column'} fontSize={'12px'} color={'#00A0E9'} lineHeight={'16px'} fontFamily={'Lucida Sans Unicode'}>STEP 2 <TitleOfSteps>Email Verification</TitleOfSteps></Tab>
                    <Tab alignItems={'flex-start'} flexDirection={'column'} fontSize={'12px'} color={'#00A0E9'} lineHeight={'16px'} fontFamily={'Lucida Sans Unicode'}>STEP 3 <TitleOfSteps>Account Credentials</TitleOfSteps></Tab>
                    <Tab alignItems={'flex-start'} flexDirection={'column'} fontSize={'12px'} color={'#00A0E9'} lineHeight={'16px'} fontFamily={'Lucida Sans Unicode'}>STEP 4 <TitleOfSteps>Completed</TitleOfSteps></Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {/* <ContactDetails /> */}
                    </TabPanel>
                    <TabPanel>
                        <EmailConfrimation />
                    </TabPanel>
                    <TabPanel>
                        <AccountCredentials />
                    </TabPanel>
                    <TabPanel>
                        <VerificationCompleted/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            </TabStepsWrapper> 
            </FooterWrapper>
        </Box>
                            </TabPanel>
                            <TabPanel>
                                <SignIn/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </GridItem>
                </Box>
            </Grid>                 
        </LeftSideWrapper>
        <RightSideWrapper />
        </Flex>
        </>
    );
  }
}

export default EmailVerification