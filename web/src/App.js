import React from "react";
import { Ditto } from "@dittolive/ditto"
import { DittoProvider } from "@dittolive/react-ditto";
import MainScene from "./MainScene";

function App() {
  return (
    <DittoProvider setup={() => {
      const ditto = new Ditto({
        type: 'onlinePlayground',
        appID: 'ce914163-2df7-4985-9821-7034891cdcda',
        enableDittoCloudSync: true
      }, 'ditto')
      ditto.setLicenseToken('o2d1c2VyX2lkeCRmZWNlYTI1Ny04MWQ5LTQxMWMtYWZhMy1mYmQ1Nzk1NTQ0ZGZmZXhwaXJ5eBgyMDIyLTAzLTMxVDIxOjU5OjU5Ljg5NFppc2lnbmF0dXJleFhDV2laU2tzME9MSjF6clR6N1NpR0hNUjQ4WExvY3VxNHBvMTVIY3VKTmxJeEhSdFEyR3BkcjlZZG5JVXFFeFFRNGMvSkJGa1owNEFXZjJQN3diY1B2UT09')
      ditto.tryStartSync();
      return ditto
    }}>
      {({ loading, error }) => {
        if (loading) {
          return <p>Loading Ditto</p>
        }
        if (error) {
          return <p className="text-red-500">Error loading Ditto {error.toString()}</p>
        }
        return <MainScene />
      }}
    </DittoProvider>
  );
}

export default App;
