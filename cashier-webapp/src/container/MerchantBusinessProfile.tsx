/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/6/13
 */
import * as styles from '../styles/merchantBusinessProfile.style';
import * as React from 'react';
import Component from 'veigar/AbstractComponent';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import BeenHere from '@material-ui/icons/Beenhere';
import Image from '@material-ui/icons/Image';

import Button from '../component/Button';
import { lang } from 'common/locale';
import { getActions } from 'common/core/store';
import withTheme from '@material-ui/core/styles/withTheme';


// 四个类型的默认证件图片
const DEFAULT_IMG = {
  ID_CARD_CORRECT_SIDE: require('../assets/legalIdFront'),
  ID_CARD_OPPOSITE_SIDE: require('../assets/legalIdRevers'),
  IDENTIFICATION_PHOTO_IN_HAND: require('../assets/handheldIdPhoto'),
  BANK_CARD_CORRECT_SIDE: require('../assets/settleBankCardFront')
};
// 上传图片,相机按钮
const CAMERAIcon = require('../assets/camera.svg');

export interface Props {

}

export interface State {
  showImg?: any;
  updateFlag: boolean;
  updateLoading: boolean;
}

class MerchantBusinessProfile extends Component<Props, State> {
  inputs;

  constructor(props, content) {
    super(props, content);
    this.state = {
      showImg: '',
      updateFlag: false,
      updateLoading: false
    };
  }

  componentWillMount() {
    const {params} = this.props;
    if (!params || Object.keys(params).length === 0) {
      getActions().navigator.back();
      return;
    }
    document.title = params.title;
  }

  /**
   * 提交实名图片
   */
  handleSubmit() {
    const {params} = this.props;
    let file = this.inputs.files[0];
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
      alert('不是有效的图片文件!');
      return;
    }
    this.setState({
      updateLoading: true
    });
    getActions().merchant.updateMerchantAnnex({
      annex: file,
      photoType: params.key,
    });
  }

  /**
   * 选定图片
   */
  handleImgChange() {
    let oFReader: any = new FileReader();
    let file = this.inputs.files[0];
    oFReader.readAsDataURL(file);
    oFReader.onloadend = (oFRevent) => {
      let src = oFRevent.target.result;
      this.setState({
        showImg: src,
        updateFlag: true
      });
    };
  }

  render() {
    const {theme, params} = this.props;
    const {showImg, updateFlag, updateLoading} = this.state;
    // 跳转title
    const title = params && params.title || '证件照';
    // 跳转判断img
    const IMG = params && params.key && DEFAULT_IMG[params.key];
    return (
      <form encType="multipart/form-data"
            name="annex"
      >
        <Grid container
              alignItems="center"
              justify="space-between"
              direction="column"
              style={{
                minHeight: '100vh'
              }}
        >
          <Grid>
            <Card style={{
              margin: 24,
              borderLeft: `4px solid ${theme.palette.primary.main}`
            }}>
              <CardContent>
                {lang.merchantBusinessVerificationTips}
              </CardContent>
            </Card>
            <p style={{
              ...styles.tips,
              fontSize: 10,
              justifyContent: 'center',
            }}>
              <Image color="action"
                     style={{
                       fontSize: 20
                     }}/>
              {`拍摄/上传您的${title}`}
            </p>
            <Grid container
                  alignItems="center"
                  justify="center"
                  style={{
                    backgroundImage: `url(${updateFlag && showImg || IMG})`,
                    ...styles.imgContainer
                  }}
            >
              <a href="javascript:;"
                 style={{
                   backgroundImage: `url(${CAMERAIcon})`,
                   ...styles.updateButton
                 }}
              >
                <input type="file"
                       ref={node => this.inputs = node}
                       style={styles.inputFile}
                       onChange={this.handleImgChange}
                />
              </a>
            </Grid>
          </Grid>
          <Card style={{
            width: '95%'
          }}>
            <Button fullWidth
                    disabled={!updateFlag}
                    loading={updateLoading}
                    onClick={this.handleSubmit}
            >{"下一步"}</Button>
          </Card>
          <p style={{
            marginBottom: 10,
            fontSize: 13,
            ...styles.tips
          }}>
            <BeenHere color="disabled"/>
            {"信息仅用于身份验证，聚兜兜保障您的信息安全"}
          </p>
        </Grid>
      </form>
    );
  }
}

export default withTheme()(MerchantBusinessProfile as any)
