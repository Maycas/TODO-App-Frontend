import React from 'react'
import { Modal, Box } from '@mui/material'

const TaskModal = ({ children, open, onClose, ...rest }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.8' } },
        }}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '50vw',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}>
          {React.Children.map(children, child =>
            React.cloneElement(child, { onClose, ...rest })
          )}
        </Box>
      </Modal>
    </>
  )
}

export default TaskModal
