/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/5/2
 */
import * as React from 'react';
import Component from 'veigar/AbstractComponent';
import Button from '../component/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { lang } from 'common/locale';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface Props {
  isDialog: boolean;
  title: string;
  children: any;
  onClose: any;
  operation: object;
}

export default class Dialogs extends Component<Props> {
  render() {
    const {children, isDialog, onClose, title, operation, ...other} = this.props;
    return (
      <Dialog {...other}
              fullWidth
              open={isDialog}
              onClose={onClose}
              aria-labelledby="simple-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">{title || '操作请慎重'}</DialogTitle>
        {
          operation && (
            <React.Fragment>
              <DialogContent>
                <DialogContentText>
                  {operation.text}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={operation.handleClose}
                        color="primary"
                        disabled={operation.loading}
                >
                  {lang.cancel}
                </Button>
                <Button onClick={operation.handleConfirm}
                        color="primary"
                        autoFocus
                        loading={operation.loading}
                >
                  {lang.confirm}
                </Button>
              </DialogActions>
            </React.Fragment>
          )
        }
        {children}
      </Dialog>
    )
  }
}
