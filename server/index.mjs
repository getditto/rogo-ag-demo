import { Ditto, TransportConfig } from "@dittolive/ditto";
import path from "path";


var liveQuery;
var peersObserver;

async function main() {
  const ditto = new Ditto(
    {
      type: "onlinePlayground",
      appID: "ce914163-2df7-4985-9821-7034891cdcda",
      enableDittoCloudSync: true,
    },
    path.resolve(process.cwd(), "ditto-data")
  );

  ditto.setLicenseToken(
    "o2d1c2VyX2lkeCRmZWNlYTI1Ny04MWQ5LTQxMWMtYWZhMy1mYmQ1Nzk1NTQ0ZGZmZXhwaXJ5eBgyMDIyLTAzLTMxVDIxOjU5OjU5Ljg5NFppc2lnbmF0dXJleFhDV2laU2tzME9MSjF6clR6N1NpR0hNUjQ4WExvY3VxNHBvMTVIY3VKTmxJeEhSdFEyR3BkcjlZZG5JVXFFeFFRNGMvSkJGa1owNEFXZjJQN3diY1B2UT09"
  );

  const config = new TransportConfig();
  config.enableDittoCloudSync = true;
  config.setAllPeerToPeerEnabled(true);
  config.listen.tcp.isEnabled = true;
  config.listen.tcp.interfaceIP = "0.0.0.0";
  config.listen.http.websocketSync = true;
  config.listen.http.isEnabled = true;
  config.listen.http.port = 4000;

  ditto.setTransportConfig(config);
  ditto.tryStartSync();
  
  liveQuery = ditto.store.collection('tasks').findAll().observe((docs) => {
    docs.forEach(doc => {
      console.log('Document', {_id: doc._id, body: doc.body, isDone: doc.isDone})
    })
  })
  
  peersObserver = ditto.observePeers((peers) => {
    console.log(`Peers: `, peers)
  })
}

main();

setInterval(() => {}, 1000);
