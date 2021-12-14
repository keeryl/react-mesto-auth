import React from 'react';
import '../index.css';
import Header from './Header/Header.js';
import Main from './Main/Main.js';
import Footer from './Footer/Footer.js';
import ImagePopup from './ImagePopup/ImagePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup/DeleteCardPopup.js';
import { Route, Switch } from 'react-router-dom';
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.js';
import InfoTooltip from './InfoTooltip/InfoTooltip.js';


function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopup] = React.useState(false);
  const [isTooltipPopupOpened, setIsTooltipPopup] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopup] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopup] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
      api.getInitialCards()
        .then(result => {
          setCards([...result]);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

  React.useEffect(() => {
      api.getUserInfo()
        .then(result => {
          setCurrentUser({...result});
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    if (isLiked) {
      api.removeLike(card._id)
        .then(result => {
          setCards((cards) => cards.map((c) => c._id === card._id ? result : c));
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      api.addLike(card._id)
      .then(result => {
        setCards((cards) => cards.map((c) => c._id === card._id ? result : c));
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  const handleCardDelete = (card) => {
    const isOwn = card.owner._id === currentUser._id;
    if (isOwn) {
      api.deleteCard(card._id)
        .then(result => {
          setCards(cards => cards.filter(c => c._id !== card._id ));
          closeAllPopups();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  function handleUpdateUser (name, description) {
    api.editUserProfile(name, description)
      .then(result => {
        setCurrentUser({
          ...currentUser,
          name: result.name,
          about: result.about,
        });
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
  }

  function handleUpdateAvatar (url) {
    api.editAvatar(url)
      .then(result => {
        setCurrentUser({
          ...currentUser,
          avatar: result.avatar,
        });
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
  }

  function handleAddPlaceSubmit (cardName, cardUrl) {
    api.addCard(cardName, cardUrl)
      .then(result => {
        setCards([result, ...cards]);
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopup(true);
  }

  function handleEditProfileClick () {
    setIsEditProfilePopup(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopup(true);
  }

  function closeAllPopups () {
    setIsEditAvatarPopup(false);
    setIsEditProfilePopup(false);
    setIsAddPlacePopup(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopup(false);
    setSelectedCard({});
  }

  function handleCardClick (card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardDeleteButton (card) {
    setIsDeleteCardPopup(true);
    setSelectedCard(card);
  }

  function handleLogin () {
    setLoggedIn(true);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Switch>
          <ProtectedRoute
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDeleteClick={handleCardDeleteButton}
          />
          <Route path="/sign-up">
            <Register
              onLogin={handleLogin}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              onLogin={handleLogin}
            />
          </Route>
        </Switch>
        <Footer/>

        <InfoTooltip/>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={selectedCard}
        />
        <ImagePopup
          card={selectedCard}
          isOpened={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
