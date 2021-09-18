import {
    AppBar,
    Button,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../redux/store/store";
import SignedInMenu from "../Menus/SignedInMenu";
import SignedOutMenu from "../Menus/SignedOutMenu";
import mainLogo from "../../Assets/Logo2.png";
import {
    updateBizFundraiser,
    updateProjectMaker,
} from "../../App/Util/reusableFunctions/updateUserData";
import web3 from "../../Ethereum/web3";

interface Props extends PropsFromRedux {}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%",
    },
    appBar: {
        padding: "0.5rem",
        background:
            "linear-gradient(138deg, rgba(10,39,12,1) 0%, rgba(57,210,98,1) 42%, rgba(59,131,218,1) 80%)",
    },
    title: {
        flexGrow: 1,
        marginLeft: 10,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    logo: {
        maxWidth: 80,
    },
    margin: {
        marginLeft: 20,
    },
    typo: {
        color: "inherit",
        textDecoration: "none",
        "@media (max-width:960px)": {
            fontSize: "1.5rem",
        },
        "@media (max-width:355px)": {
            fontSize: "1rem",
        },
    },
}));

const Navbar = ({ auth }: Props) => {
    const [buttonTxt, setButtonTxt] = useState("Connect Metamask");

    const connectMetamask = async () => {
        console.log("Connected");
        let ethereum = (window as any).ethereum;
        const isMetaMaskInstalled = () => {
            //Have to check the ethereum binding on the window object to see if it's installed
            console.log(Boolean(ethereum && ethereum.isMetaMask));
            return Boolean(ethereum && ethereum.isMetaMask);
        };

        const params = [
            {
                chainId: "0x13881",
                chainName: "Mumbai Testnet",
                rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                nativeCurrency: {
                    name: "Matic Token",
                    symbol: "MATIC",
                    decimals: 18,
                },
                blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
            },
        ];

        if (isMetaMaskInstalled()) {
            try {
                await ethereum.request({
                    method: "wallet_addEthereumChain",
                    params,
                });

                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });

                const caseAddress = web3.utils.toChecksumAddress(accounts[0]);
                if (!auth.currentUser) {
                    setButtonTxt(caseAddress);
                } else {
                    if (caseAddress === auth.currentUser.metamaskAddress)
                        setButtonTxt(caseAddress);
                    else {
                        const BFToken = localStorage.getItem("logInTokenBF");
                        const PMToken = localStorage.getItem("logInTokenPM");
                        if (BFToken) {
                            const user = await updateBizFundraiser(
                                { metamaskAddress: caseAddress },
                                BFToken
                            );
                            window.location.reload();
                        } else if (PMToken) {
                            const user = await updateProjectMaker(
                                { metamaskAddress: caseAddress },
                                PMToken
                            );
                            window.location.reload();
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            setButtonTxt("Install Metamask");
        }
    };

    const classes = useStyles();
    return (
        <div className={classes.root} id="back-to-top-anchor">
            <AppBar className={classes.appBar}>
                <Toolbar>
                    {/* Logo */}
                    <Link to="/">
                        <img
                            src={mainLogo}
                            alt="Logo"
                            className={classes.logo}
                        />
                    </Link>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={(classes.flex, classes.title)}
                    >
                        <Link to="/" className={classes.typo}>
                            <strong>OXYLUS</strong>
                        </Link>
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={connectMetamask}
                    >
                        <Typography color="textPrimary">{buttonTxt}</Typography>
                    </Button>

                    {auth.authenticated ? (
                        <SignedInMenu
                            auth={auth}
                            // classes={classes}
                            // toggleDarkMode={toggleDarkMode}
                        />
                    ) : (
                        <SignedOutMenu />
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapState2Props = (state: RootState) => {
    return { auth: state.auth };
};

const connector = connect(mapState2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navbar);
