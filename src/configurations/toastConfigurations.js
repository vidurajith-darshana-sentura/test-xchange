import Snackbar from "react-native-snackbar";

const config = {
    numberOfLines: 2,
    duration: 3000
}

export const showToast = (data) => {
    if (data.code === 500) {
        config['backgroundColor'] = '#DC3545';
    } else if (data.code === 200) {
        config['backgroundColor'] = '#28A745';
    }
    config['text'] = data.result;
    Snackbar.show(config);
}
