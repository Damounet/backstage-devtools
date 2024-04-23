import React from 'react';
import {SearchContextProvider} from "@backstage/plugin-search-react";
import {Content, InfoCard, Link, Page} from "@backstage/core-components";
import {Grid, makeStyles, Typography} from "@material-ui/core";
import {HomePageSearchBar} from "@backstage/plugin-search";
import {
    HomePageToolkit,
    HomePageCompanyLogo,
    HomePageStarredEntities,
    TemplateBackstageLogo, Tool,
} from "@backstage/plugin-home";
import { IconContext } from "react-icons";
import { PiGitlabLogoDuotone } from "react-icons/pi";
import { SiSonarqube, SiJenkins, SiSonatype, SiCncf } from "react-icons/si";
import { GrMicrofocus } from "react-icons/gr";

const useStyles = makeStyles(theme => ({
    searchBarInput: {
        maxWidth: '60vw',
        margin: 'auto',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '50px',
        boxShadow: theme.shadows[1],
    },
    searchBarOutline: {
        borderStyle: 'none'
    },
    docDescription: {
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    docSubLink: {
        fontSize: theme.typography.subtitle1.fontSize,
        fontWeight: theme.typography.subtitle1.fontWeight,
        lineHeight: theme.typography.subtitle1.lineHeight,
    },
    docsTitleLink: {
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
        lineHeight: theme.typography.h6.lineHeight,
    },
}));

const useLogoStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(5, 0),
    },
    svg: {
        width: 'auto',
        height: 100,
    },
    path: {
        fill: '#7df3e1',
    },
}));

export const HomePage = () => {
    const classes = useStyles();
    const {svg, path, container} = useLogoStyles();
    const toolKit: Tool[] = [
        {
            url: "https://gitlab.codep.inetum.world/",
            label: "Gitlab",
            icon: <PiGitlabLogoDuotone />
        },
        {
            url: "https://jenkins.codep.inetum.world/",
            label: "Jenkins",
            icon: <SiJenkins />
        },
        {
            url: "https://nexus.codep.inetum.world/",
            label: "Nexus",
            icon: <SiSonatype />
        },
        {
            url: "https://sonar.codep.inetum.world/",
            label: "SonarQube",
            icon: <SiSonarqube />
        },
        {
            url: "https://microcks.asd.saas-gfi.eu/",
            label: "Microcks",
            icon: <SiCncf />
        },
        {
            url: "https://emea.fortify.com/SSO/Login/c43c8ab0-280b-4809-a039-2c89f672d2d6",
            label: "Fortify",
            icon: <GrMicrofocus />
        }
    ];

    return (
        <SearchContextProvider>
            <Page themeId="home">
                <Content>
                    <Grid container justifyContent="center" spacing={6}>
                        <HomePageCompanyLogo
                            className={container}
                            logo={<TemplateBackstageLogo classes={{svg, path}}/>}
                        />
                        <Grid container item xs={12} justifyContent='center'>
                            <HomePageSearchBar
                                InputProps={{
                                    classes: {
                                        root: classes.searchBarInput,
                                        notchedOutline: classes.searchBarOutline
                                    }
                                }}
                                placeholder="Search"
                            />
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={12} md={6}>
                                <InfoCard title="Bienvenue sur Backstage">
                                    <div key="backstage-docs-default" data-testid="docs-card-content" >
                                        <Typography className={classes.docDescription}>
                                            <p>Backstage est un portail développeur open source. S'appuyant sur un
                                                catalogue centralisé, Backstage permets d'organiser et de mettre de l'ordre
                                                dans nos services et notre infrastructure ce qui permet à nos équipes de
                                                développement de fournir un haut niveau de qualité sur leur delivery sans
                                                compromettre leur autonomie.  </p>

                                            <p>Backstage unifie tous les outils de build, services et documentation technico-fonctionnelle afin de fournir un environnement de développement rationnalisé de bout en bout.  </p>

                                            <p>Backstage inclus:
                                               <ul>
                                                   <li>Un catalogue applicatif pour gérer tous les logiciels que ca soit un microservice, une librairie, une dépendance, les sites webs, etc.</li>
                                                   <li>TechDocs pour faciliter la création, la maintenance, la recherche et l'utilisation de la documentation technique, en utilisant une approche "DocAsCode".</li>
                                                   <li>Une librairie de plugins permettant d'étendre encore sa customisation et ses fonctionnalités.</li>
                                               </ul>
                                            </p>
                                            <p>Backstage a été créé par Spotify mais est maintenant maintenu par la Cloud Native Computing Foundation (CNCF).</p>
                                        </Typography>
                                        <Link className={classes.docSubLink} data-testid="docs-card-sub-link" to="/docs/default/component/backstage/" >
                                            En savoir plus...
                                        </Link>
                                    </div>
                                </InfoCard>
                            </Grid>
                            <IconContext.Provider value={{ color: "#7df3e1", style: { height: "2.5em", width: "2.5em" } }}>
                                <Grid item xs={12} md={6}>
                                    <HomePageToolkit
                                        tools={toolKit}
                                    />
                                    <HomePageStarredEntities/>
                                </Grid>
                            </IconContext.Provider>
                        </Grid>
                    </Grid>
                </Content>
            </Page>
        </SearchContextProvider>
    );
};
