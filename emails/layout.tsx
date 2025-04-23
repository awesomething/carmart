// import { Html, Head, Preview, Body, Container, Section, Text, Tailwind, Font, Row, Column, Link, Img } from '@react-email/components';
// import { config } from "dotenv"
// config()

// import { PropsWithChildren } from 'react';

// const twConfig = {};
// interface EmailLayoutProps extends PropsWithChildren {
//     preview?: string;
// }
// const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_APP_URL

// const EmailLayout = ({ children, preview = "" }: EmailLayoutProps) => {
//     return (
//         <Html>
//             <Tailwind config={twConfig}>
//                 <Head>
//                     <Font fontFamily='Roboto'
//                         fallbackFontFamily="Verdana" />
//                     <meta name='color-scheme' content='light-only' />
//                     <meta name="supported-color-schemes" content="light-only" />

//                 </Head>
//                 <Preview>{preview}</Preview>
//                 <Body style={{ backgroundColor: '#f4f4f4', margin: "0, auto", padding: "16px, 16px 0 16px", fontFamily: "-apple-system, BlinkMaxSystemFont, 'Roboto, sans-serif" }} >
//                     <Container style={{ margin: "0 auto" }}>
//                         <Container style={{ backgroundColor: "#000000" }} className='rounded-lg p-4 2xl:p-6 mb-4 2xl:mb-6'>
//                             <Section>
//                                 <Row>
//                                     <Column>
//                                         <Link target='_blank' rel='noopener noreferrer' href={baseUrl}>
//                                             <Img
//                                                 src={`${baseUrl}/static/logo-1.png`}
//                                                 alt='logo'
//                                                 className='h-full w-[200px]'
//                                             />


//                                         </Link>
//                                     </Column>
//                                 </Row>
//                             </Section>
//                         </Container>
//                         <Container style={{ backgroundColor: "#fff" }}
//                             className='rounded-lg p-4 2xl:p-6 mb-4 2xl:mb-6'>
//                             {children}
//                         </Container>
//                         <Container style={{ backgroundColor: "#000000" }}
//                             className='rounded-lg p-4 2xl:p-6 mb-4 2xl:mb-6'>
//                             <Section>
//                                 <Row>
//                                     <Column className='flex items-center' align='left'>
//                                         <Img className='w-16 h-16' src={`${baseUrl}/static/logo-mob2.png`} />
//                                     </Column>
//                                     <Column align='right' className='text-sm text-gray-500'>
//                                         <address className='not-italic text-right text-xs'>
//                                             <span className="text-gray-100">
//                                                 EazyDev Dealership
//                                             </span>
//                                             <br /> 1, Somewhere on earth, <br /> Earth, Milky Way Galaxy
//                                             <br />
//                                             <Link href="mailto:hello@eazdevdealership.com" className='text-blue-500 hover:text-blue-700 underline'>
//                                                 hello@eazdevdealership.com
//                                             </Link>
//                                         </address>
//                                     </Column>
//                                 </Row>
//                             </Section>
//                         </Container>
//                     </Container>
//                 </Body>
//             </Tailwind>

//         </Html>
//     )
// }
// export default EmailLayout;