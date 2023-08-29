import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './styles/_styles.scss';
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
import HowToContribute from "./Pages/HowToContribute/HowToContribute";
import HowToDonatePapersForm from './Pages/Forms/HowToDonatePapers';
import CorrectionsForm from './Pages/Forms/CorrectionsForm';
import ContactUsForm from "./Pages/Forms/ContactUsForm";
import MoreIdeasForm from './Pages/Forms/MoreIdeasForm';
import PDFViewer from './Pages/PDFViewer/PDFViewer';
import {Resources} from "./Pages/HowToContribute/components/Resources";

import Organizations from "./Pages/ResearchingNWC/Organizations";

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

function App() {
  return (
    <BrowserRouter basename={'/dev'} className="App">
    {/* </Router><Router className="App"> */}
      <Navigation />
      <ScrollToTop>
      <Routes>
        <Route path="about" element={<About />} />
        <Route path="why" element={<Why />} />
        <Route path="essay/:essayId" element={<Essay />} />
        <Route path="discover/:storyId" element={<DiscoverInfo />} />
        <Route path="discover" element={ <Discover />} />
        <Route path="researchingNWC" element={<ResearchingNWC />} />
        <Route path="advancedSearch" element={<AdvancedSearch />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="participants" element={<Participants />} />
        <Route path="pdfviewer/:pdffile" element={<PDFViewer />} />
        <Route path="forms/corrections" element={<CorrectionsForm />} />
        <Route path="forms/contactus" element={ <ContactUsForm />} />
        <Route path="forms/donatepapers" element={ <HowToDonatePapersForm />} />
        <Route path="forms/moreideas" element={<MoreIdeasForm />} />
        <Route path="howtocontribute" element={<HowToContribute />} />
        <Route path="howtocontribute/:resource" element={<Resources />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </ScrollToTop>
      <Footer />
    </BrowserRouter>
  );
}

export default App;