// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

import {getStatusColors} from '@utils/message_attachment_colors';
import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';

import AttachmentActions from './attachment_actions';
import AttachmentAuthor from './attachment_author';
import AttachmentFields from './attachment_fields';
import AttachmentImage from './attachment_image';
import AttachmentPreText from './attachment_pretext';
import AttachmentText from './attachment_text';
import AttachmentThumbnail from './attachment_thumbnail';
import AttachmentTitle from './attachment_title';
import AttachmentFooter from './attachment_footer';

export default class MessageAttachment extends PureComponent {
    static propTypes = {
        attachment: PropTypes.object.isRequired,
        baseTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
        blockStyles: PropTypes.object,
        deviceHeight: PropTypes.number.isRequired,
        deviceWidth: PropTypes.number.isRequired,
        metadata: PropTypes.object,
        postId: PropTypes.string.isRequired,
        onPermalinkPress: PropTypes.func,
        theme: PropTypes.object,
        textStyles: PropTypes.object,
    };

    render() {
        const {
            attachment,
            baseTextStyle,
            blockStyles,
            deviceHeight,
            deviceWidth,
            metadata,
            onPermalinkPress,
            postId,
            textStyles,
            theme,
        } = this.props;

        const style = getStyleSheet(theme);
        const STATUS_COLORS = getStatusColors(theme);
        const hasImage = Boolean(metadata?.images?.[attachment.image_url]);

        let borderStyle;
        if (attachment.color) {
            if (attachment.color[0] === '#') {
                borderStyle = {borderLeftColor: attachment.color};
            } else if (STATUS_COLORS.hasOwnProperty(attachment.color)) {
                borderStyle = {borderLeftColor: STATUS_COLORS[attachment.color]};
            }
        }

        return (
            <React.Fragment>
                <AttachmentPreText
                    baseTextStyle={baseTextStyle}
                    blockStyles={blockStyles}
                    metadata={metadata}
                    onPermalinkPress={onPermalinkPress}
                    textStyles={textStyles}
                    value={attachment.pretext}
                />
                <View style={[style.container, style.border, borderStyle]}>
                    <AttachmentAuthor
                        icon={attachment.author_icon}
                        link={attachment.author_link}
                        name={attachment.author_name}
                        theme={theme}
                    />
                    <AttachmentTitle
                        link={attachment.title_link}
                        theme={theme}
                        value={attachment.title}
                    />
                    <AttachmentThumbnail url={attachment.thumb_url}/>
                    <AttachmentText
                        baseTextStyle={baseTextStyle}
                        blockStyles={blockStyles}
                        deviceHeight={deviceHeight}
                        hasThumbnail={Boolean(attachment.thumb_url)}
                        metadata={metadata}
                        onPermalinkPress={onPermalinkPress}
                        textStyles={textStyles}
                        value={attachment.text}
                        theme={theme}
                    />
                    <AttachmentFields
                        baseTextStyle={baseTextStyle}
                        blockStyles={blockStyles}
                        fields={attachment.fields}
                        metadata={metadata}
                        onPermalinkPress={onPermalinkPress}
                        textStyles={textStyles}
                        theme={theme}
                    />
                    <AttachmentFooter
                        icon={attachment.footer_icon}
                        text={attachment.footer}
                        theme={theme}
                    />
                    <AttachmentActions
                        actions={attachment.actions}
                        postId={postId}
                    />
                    {hasImage &&
                    <AttachmentImage
                        deviceHeight={deviceHeight}
                        deviceWidth={deviceWidth}
                        imageUrl={attachment.image_url}
                        imageMetadata={metadata?.images?.[attachment.image_url]}
                        postId={postId}
                        theme={theme}
                    />
                    }
                </View>
            </React.Fragment>
        );
    }
}

const getStyleSheet = makeStyleSheetFromTheme((theme) => {
    return {
        container: {
            borderBottomColor: changeOpacity(theme.centerChannelColor, 0.15),
            borderRightColor: changeOpacity(theme.centerChannelColor, 0.15),
            borderTopColor: changeOpacity(theme.centerChannelColor, 0.15),
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderTopWidth: 1,
            marginTop: 5,
            padding: 12,
        },
        border: {
            borderLeftColor: changeOpacity(theme.linkColor, 0.6),
            borderLeftWidth: 3,
        },
    };
});
