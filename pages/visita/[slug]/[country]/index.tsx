import React from "react";
import Head from "next/head";
import { FunctionComponent } from "react";
import AquaClient from "../../../../graphql/aquaClient";
import { configuration } from "../../../../configuration";

interface Props {
  redirect: string;
}

export const GET_BONUS_BY_SLUG = `
    query GET_BONUS_BY_SLUG($slug:String){
        bonuses(where:{ slug: $slug, country: {code:"it"}}){
        id
        name
        country{
          code
        }
        bonus_guide{
          slug
        }
        rating
        withDeposit
        noDeposit
        backgroundColor
        borderColor
        link
        description
        legacyId
        circular_image{
            url
        }
        }   
    }
`;

const index: FunctionComponent<Props> = ({ redirect }) => {
  console.log("redirecting to unibt");
  return (
    <div>
      <Head>
        <meta httpEquiv="refresh" content={`0.1;url=${redirect}`}></meta>
      </Head>
    </div>
  );
};

// unibet https://dspk.kindredplc.com/redirect.aspx?pid=5615153&bid=27508

const bonusQuery = `
query($compareCode:String="hello", $id : ID=1){
    streamer(id:$id){
      bonuses(where:  {compareCode:$compareCode}){
        name
        compareCode
        links{
          link
          label
        }
      }
    }
  }
`;

export async function getServerSideProps({ query, res }) {
  const slug = query.slug as string;
  const country = query.country as string;
  const fromInstagram = query.instagram as string;
  const fromTwitch = query.twitch as string;

  let redirect;

  const aquaClient = new AquaClient();

  console.log(`${slug} ${configuration.streamerName} it`);

  const links = await aquaClient.query({
    query: bonusQuery,
    variables: {
      compareCode: slug,
      id: configuration.streamerId,
      label: `${slug} ${configuration.streamerName} ${country}`,
    },
  });

  let link = links.data.data.streamer.bonuses[0].links.find(
    (b) => b.label === `${slug} ${configuration.streamerName} ${country}`
  );
  if (link == undefined)
    link = links.data.data.streamer.bonuses[0].links.find(
      (b) => b.label === `${slug} ${configuration.streamerName} row`
    );

  if (fromInstagram === "true") {
    if (link.label.includes("wincsn"))
      link.link =
        "https://www.wincasinopromo.it/?mp=2e7819f5-37ba-4a97-9b8f-c1b30f145196";
    if (link.label.includes("starcsn"))
      link.link =
        "http://record.affiliatelounge.com/_SEA3QA6bJTMP_fzV1idzxmNd7ZgqdRLk/51/";
    if (link.label.includes("starvgs"))
      link.link = "https://www.starvegas.it/gmg/refer/5de540507e200c00012d5fad";
    if (link.label.includes("eurobt"))
      link.link =
        "https://record.betpartners.it/_E_C7XwxgprAZV93hC2dJ_GNd7ZgqdRLk/6/";
    if (link.label.includes("csncom"))
      link.link =
        "https://record.mansionaffiliates.com/_-ZJRcUjxY8Gtxzdkw94pNWNd7ZgqdRLk/6/";
    if (link.label.includes("888"))
      link.link = "https://ic.aff-handler.com/c/43431?sr=1862015";
    if (link.label.includes("leovgs"))
      link.link =
        "https://ads.leovegas.com/redirect.aspx?pid=3710704&bid=14965";
    if (link.label.includes("snai"))
      link.link =
        "https://affiliazioniads.snai.it/redirect.aspx?pid=30224&bid=2479";
    if (link.label.includes("btflg"))
      link.link = "https://adv.betflag.com/redirect.aspx?pid=5367&bid=2680";

    if (link.label.includes("pkrstr"))
      link.link =
        "https://secure.starsaffiliateclub.com/C.ashx?btag=a_182454b_5683c_&affid=100976968&siteid=182454&adid=5683&c=";
    if (link.label.includes("gd"))
      link.link =
        "https://mediaserver.entainpartners.com/renderBanner.do?zoneId=2036583";
    if (link.label.includes("bwin"))
      link.link =
        "https://mediaserver.entainpartners.com/renderBanner.do?zoneId=2036584";
    if (link.label.includes("goldbt"))
      link.link =
        "https://media.goldbetpartners.it/redirect.aspx?pid=5397&bid=1495";
    if (link.label.includes("unibt"))
      link.link =
        "https://b1.trickyrock.com/redirect.aspx?pid=79237117&bid=27508";
    if (link.label.includes("admiral"))
      link.link =
        "http://wladmiralinteractive.adsrv.eacdn.com/wl/clk/?btag=a_2785b_177&aid=";

    if (link.label.includes("btway"))
      link.link =
        "https://betway.it/bwp/welcome-5gratis/it-it/?s=bw210475&a=AFF3413145431712861&utm[…]rce=210475&utm_medium=Affiliate&utm_campaign=AFF3413145431712861";
  }

  //casino.com betflag goldbet unibet

  if (fromTwitch === "true") {
    if (link.label.includes("wincsn"))
      link.link =
        "https://www.wincasinopromo.it/?=mpda4cb107-b6aa-4226-b1e8-23aa29b99a43";
    if (link.label.includes("starcsn"))
      link.link =
        "http://record.affiliatelounge.com/_SEA3QA6bJTMP_fzV1idzxmNd7ZgqdRLk/146/";
    if (link.label.includes("starvgs"))
      link.link = "https://www.starvegas.it/gmg/refer/61e9486fd9610f0001915dfe";
    if (link.label.includes("eurobt"))
      link.link =
        "https://record.betpartners.it/_E_C7XwxgprAZV93hC2dJ_GNd7ZgqdRLk/122/";
    if (link.label.includes("888"))
      link.link = "https://mmwebhandler.aff-online.com/C/43430?sr=1858571";
    if (link.label.includes("leovgs"))
      link.link =
        "https://ads.leovegas.com/redirect.aspx?pid=3732732&bid=14965";
    if (link.label.includes("snai"))
      link.link =
        "https://affiliazioniads.snai.it/redirect.aspx?pid=30686&bid=2479";
    // if (link.label.includes("btflg"))
    //   link.link = "https://adv.betflag.com/redirect.aspx?pid=5367&bid=2680";

    if (link.label.includes("pkrstr"))
      link.link =
        "https://secure.starsaffiliateclub.com/C.ashx?btag=a_184418b_5683c_&affid=100976968&siteid=184418&adid=5683&c=";
    if (link.label.includes("gd"))
      link.link =
        "https://mediaserver.entainpartners.com/renderBanner.do?zoneId=2043023";
    if (link.label.includes("bwin"))
      link.link =
        "https://mediaserver.entainpartners.com/renderBanner.do?zoneId=2043024";
    // if (link.label.includes("goldbt"))
    //   link.link =
    //     "https://media.goldbetpartners.it/redirect.aspx?pid=5397&bid=1495";
    // if (link.label.includes("unibt"))
    //   link.link =
    //     "https://b1.trickyrock.com/redirect.aspx?pid=79237117&bid=27508";
    if (link.label.includes("admiral"))
      link.link =
        "http://wladmiralinteractive.adsrv.eacdn.com/C.ashx?btag=a_2853b_507c_&affid=827&siteid=2853&adid=507&c=";

    if (link.label.includes("btway"))
      link.link =
        "https://www.betway.it/?s=bw210475&a=AFF3488313269584309&mid=15287&utm_source=210475&utm_medium=Affiliate&utm_campaign=AFF3488313269584309";

    if (link.label.includes("btway"))
      link.link =
        "https://campaigns.williamhill.it/C.ashx?btag=a_197410b_834c_&affid=1740696&siteid=197410&adid=834&c=";
  }

  return {
    props: {
      redirect: link.link,
    },
  };
}

export default index;
