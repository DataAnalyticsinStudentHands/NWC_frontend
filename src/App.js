import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './Custom.css';
import Footer from "./Components/Footer/Footer";
import Navigation from './Components/Navigation/Navigation';
import Home from './Pages/Home/Home';
import ResearchingNWC from "./Pages/ResearchingNWC/ResearchingNWC";
import AdvancedSearch from "./Pages/ResearchingNWC/AdvancedSearch/AdvancedSearch";
import About from "./Pages/AboutProject/About";
import Why from "./Pages/Why/Why";
import Essay from "./Pages/Essay/Essay";
import Participants from "./Pages/Participants/Participants";
import Discover from "./Pages/Discover/Discover";
import DiscoverInfo from "./Pages/Discover/DiscoverInfo";
import MeetTheTeam from "./Pages/MeetTheTeam/MeetTheTeam";
import HowToContribute from "./Pages/HowToContribute/HowToContribute";
import HowToDonatePapersForm from './Pages/Forms/HowToDonatePapers';
import CorrectionsForm from './Pages/Forms/CorrectionsForm';
import ContactUsForm from "./Pages/Forms/ContactUsForm";
import MoreIdeasForm from './Pages/Forms/MoreIdeasForm';
import PDFViewer from './Pages/PDFViewer/PDFViewer';
import ScrollToTop from "./Components/util/ScrollToTop";
import ResourceResearchers from "./Pages/HowToContribute/ResourceResearchers/ResourceResearchers"
import ResourceArchivists from "./Pages/HowToContribute/ResourceArchivists/ResourceArchivists"
import ResourceStudents from "./Pages/HowToContribute/ResourceStudents/ResourceStudents"
import ResourceNWC from "./Pages/HowToContribute/ResourceNWC/ResourceNWC"
import ResourceEducators from "./Pages/HowToContribute/ResourceEducators/ResourceEducators"
import Organizations from "./Pages/ResearchingNWC/Organizations"

function App() {
  return (
    <Router basename={'/dev'} className="App">
    {/* </Router><Router className="App"> */}
      <Navigation />
      <ScrollToTop>
      <Switch>
        <Route path="/Organizations">
          <Organizations />
        </Route>
        <Route path="/MeetTheTeam">
          <MeetTheTeam />
        </Route>
        <Route path="/DiscoverNWCStories">
          <Discover />{/*<DiscoverNWCStories/>*/}
        </Route>
        <Route path="/discover/:storyId">
          <DiscoverInfo />
        </Route>
        <Route path="/Discover">
          <Discover />
        </Route>
        <Route path="/Why">
          <Why />
        </Route>
        <Route path="/Essay">
          <Essay />
        </Route>
         <Route path="/ResearchingNWC">
            <ResearchingNWC />
        </Route> 
        <Route path="/HowToContribute">
          <HowToContribute />
        </Route>
        <Route path="/AdvancedSearch">
          <AdvancedSearch />
        </Route> 
        <Route path="/About">
          <About></About>
        </Route>
        <Route path="/Participants">
          <Participants />
        </Route>
        <Route path="/PDFViewer/:pdffile">
          <PDFViewer />
        </Route>
        <Route path="/Forms/CorrectionsForm">
          <CorrectionsForm />
        </Route>
        <Route path="/Forms/ContactUsForm">
          <ContactUsForm />
        </Route>
        <Route path="/Forms/HowToDonatePapersForm">
          <HowToDonatePapersForm />
        </Route>
        <Route path="/Forms/MoreIdeasForm">
          <MoreIdeasForm />
        </Route>
        <Route path="/ResourceResearchers">
          <ResourceResearchers />
        </Route>
        <Route path="/ResourceArchivists">
          <ResourceArchivists />
        </Route>
        <Route path="/ResourceStudents">
          <ResourceStudents />
        </Route>
        <Route path="/ResourceNWC">
          <ResourceNWC />
        </Route>
        <Route path="/ResourceEducators">
          <ResourceEducators />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </ScrollToTop>
      <Footer />
    </Router>
  );
}

export default App;