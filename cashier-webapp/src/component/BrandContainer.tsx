import * as React from 'react';
import AbstractComponent from 'veigar/AbstractComponent';
import Form from 'veigar/Form';

const styles = {
  container: {
    padding: 15
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    marginVertical: 50
  },
  logoImg: {
    resizeMode: 'contain',
    width: 100,
    height: 100
  }
};

/**
 * 带有品牌的容器页面
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/22
 */
export default abstract class BrandContainer extends AbstractComponent {

  form: Form;

  abstract renderChildren();

  render() {
    return (
      <Form ref={(form: Form) => this.form = form}
            style={styles.container}
      >
        {this.renderChildren()}
      </Form>
    );
  }

}
