// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

import Markdown from '@components/markdown';

export default class AttachmentPreText extends PureComponent {
    static propTypes = {
        baseTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
        blockStyles: PropTypes.object.isRequired,
        metadata: PropTypes.object,
        onPermalinkPress: PropTypes.func,
        textStyles: PropTypes.object.isRequired,
        value: PropTypes.string,
    };

    render() {
        const {
            baseTextStyle,
            blockStyles,
            metadata,
            onPermalinkPress,
            value,
            textStyles,
        } = this.props;

        if (!value) {
            return null;
        }

        return (
            <View style={style.container}>
                <Markdown
                    baseTextStyle={baseTextStyle}
                    textStyles={textStyles}
                    blockStyles={blockStyles}
                    disableGallery={true}
                    imagesMetadata={metadata?.images}
                    value={value}
                    onPermalinkPress={onPermalinkPress}
                />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        marginTop: 5,
    },
});
