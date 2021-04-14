package com.rossonet.rnbeta;

import android.content.Context;

import java.util.ArrayList;
import java.util.HashMap;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.oblador.keychain.KeychainModule;

import com.mattermost.react_native_interface.ResolvePromise;
import com.mattermost.react_native_interface.AsyncStorageHelper;
import com.mattermost.react_native_interface.KeysReadableArray;

public class MattermostCredentialsHelper {
    static final String CURRENT_SERVER_URL = "@currentServerUrl";
    static KeychainModule keychainModule;
    static AsyncStorageHelper asyncStorage;

    public static void getCredentialsForCurrentServer(ReactApplicationContext context, ResolvePromise promise) {
        final ArrayList<String> keys = new ArrayList<String>(1);
        keys.add(CURRENT_SERVER_URL);

        if (keychainModule == null) {
            keychainModule = new KeychainModule(context);
        }

        if (asyncStorage == null) {
            asyncStorage = new AsyncStorageHelper(context);
        }
        KeysReadableArray asyncStorageKeys = new KeysReadableArray() {
            @Override
            public int size() {
                return keys.size();
            }

            @Override
            public String getString(int index) {
                return keys.get(index);
            }
        };

        HashMap<String, String> asyncStorageResults = asyncStorage.multiGet(asyncStorageKeys);
        String serverUrl = asyncStorageResults.get(CURRENT_SERVER_URL);
        final WritableMap options = Arguments.createMap();
        // KeyChain module fails if `authenticationPrompt` is not set
        final WritableMap authPrompt = Arguments.createMap();
        authPrompt.putString("title", "Authenticate to retrieve secret");
        authPrompt.putString("cancel", "Cancel");
        options.putMap("authenticationPrompt", authPrompt);
        options.putString("service", serverUrl);

        keychainModule.getGenericPasswordForOptions(options, promise);
    }
}
