export const PATHS = {
    IMAGES: {
        FIT_SIXES_LOGO: require('../assets/fit-sixes.png'),
        NO_IMAGE: [
            require('../assets/no_image1.jpg'),
            require('../assets/no_image2.jpg'),
            require('../assets/no_image3.jpg'),
            require('../assets/no_image4.jpg'),
            require('../assets/no_image5.jpg')
        ],
        Team_1: require('../assets/team1.jpg'),
        Team_2: require('../assets/team2.jpg'),
        EMAIL_ICON: require('../assets/email_icon.png'),
        PASSWORD_ICON: require('../assets/password_icon.png'),
        LOGOUT_ICON: require('../assets/logout_icon.png'),
    }
};


export function getRandomNoImage() {
    const noImages = PATHS.IMAGES.NO_IMAGE;
    const randomIndex = Math.floor(Math.random() * noImages.length);
    return noImages[randomIndex];
}
