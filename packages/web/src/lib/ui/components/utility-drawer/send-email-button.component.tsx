import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

const useCanSend = () => {
  const canSendQuery = useQuery('hasSender', async () => {
    const res = await fetch('/api/__introspect/can-send');
    const data: { canSend: boolean } = await res.json();
    return data;
  });
  return canSendQuery;
};

const useSend = () => {
  const sendMut = useMutation({
    mutationKey: ['send'],
    mutationFn: async (args: { subject: string; to: string; html: string }) => {
      const res = await fetch('/api/__introspect/send-preview', {
        method: 'POST',
        body: JSON.stringify(args),
      });
      return;
    },
  });

  return {
    onSend: async (subject: string, to: string, html: string) => {
      await sendMut.mutateAsync({ subject, to, html });
    },
    isSending: sendMut.isLoading,
  };
};

const useSendEmailButton = (args: SendEmailButtonProps) => {
  const canSendQuery = useCanSend();
  const [isDialogOpen, setIsMenuOpen] = useState(false);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const send = useSend();
  const canSend = canSendQuery.data?.canSend;

  return {
    canSend,
    isLoading: canSendQuery.isLoading,
    isMenuOpen: isDialogOpen,
    onCloseDialog: () => setIsMenuOpen(false),
    onOpenDialog: () => setIsMenuOpen(true),
    to,
    setTo,
    subject,
    setSubject,
    ...send,
  };
};

export type SendEmailButtonProps = {
  html: string;
};

export const SendEmailButton = (props: SendEmailButtonProps) => {
  const {
    canSend,
    isLoading,
    isMenuOpen,
    onCloseDialog,
    onOpenDialog,
    isSending,
    onSend,
    setSubject,
    setTo,
    subject,
    to,
  } = useSendEmailButton(props);

  return (
    <>
      {canSend && (
        <>
          <Button variant="outlined" onClick={onOpenDialog}>
            Send email
          </Button>
          <Dialog
            open={isMenuOpen}
            onClose={onCloseDialog}
            PaperProps={{ sx: { width: [400] } }}
          >
            <DialogContent>
              <Stack
                gap={1}
                p={2}
                component="form"
                onSubmit={(e: any) => {
                  e.preventDefault();
                  onSend(subject, to, props.html);
                }}
              >
                <Typography variant="h5">Send email</Typography>
                <TextField
                  autoFocus
                  placeholder="To"
                  onChange={(e: any) => setTo(e.target.value)}
                  value={to}
                  type="email"
                  required
                />
                <TextField
                  placeholder="Subject"
                  onChange={(e: any) => {
                    setSubject(e.target.value);
                  }}
                  value={subject}
                  type="text"
                  required
                />
                <Button disabled={isSending} variant="contained" type="submit">
                  {isSending ? 'Sending' : 'Send'}
                </Button>
              </Stack>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};
