// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

import Markdown from '@components/markdown';
import ShowMoreButton from '@components/show_more_button';

const SHOW_MORE_HEIGHT = 60;

export default class AttachmentText extends PureComponent {
    static propTypes = {
        baseTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
        blockStyles: PropTypes.object.isRequired,
        deviceHeight: PropTypes.number.isRequired,
        hasThumbnail: PropTypes.bool,
        metadata: PropTypes.object,
        onPermalinkPress: PropTypes.func,
        textStyles: PropTypes.object.isRequired,
        theme: PropTypes.object,
        value: PropTypes.string,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const {deviceHeight} = nextProps;
        const maxHeight = Math.round((deviceHeight * 0.4) + SHOW_MORE_HEIGHT);

        if (maxHeight !== prevState.maxHeight) {
            return {
                maxHeight,
            };
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
            isLongText: false,
        };
    }

    handleLayout = (event) => {
        const {height} = event.nativeEvent.layout;
        const {maxHeight} = this.state;

        if (height >= maxHeight) {
            this.setState({
                isLongText: true,
            });
        }
    };

    toggleCollapseState = () => {
        const {collapsed} = this.state;
        this.setState({collapsed: !collapsed});
    };

    render() {
        const {
            baseTextStyle,
            blockStyles,
            hasThumbnail,
            metadata,
            onPermalinkPress,
            textStyles,
            theme,
            value,
        } = this.props;
        const {collapsed, isLongText, maxHeight} = this.state;

        if (!value) {
            return null;
        }

        return (
            <View style={hasThumbnail && style.container}>
                <ScrollView
                    style={{maxHeight: (collapsed ? maxHeight : null), overflow: 'hidden'}}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View
                        onLayout={this.handleLayout}
                        removeClippedSubviews={isLongText && collapsed}
                    >
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
                </ScrollView>
                {isLongText &&
                <ShowMoreButton
                    onPress={this.toggleCollapseState}
                    showMore={collapsed}
                    theme={theme}
                />
                }
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        paddingRight: 60,
    },
});
