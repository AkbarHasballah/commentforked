import React, { useState } from 'react';
import 'mantine-react-table/styles.css';
import {
  MRT_GlobalFilterTextInput,
  useMantineReactTable,
  MantineReactTable,
} from 'mantine-react-table';
import { FaCheck, FaRegImage } from 'react-icons/fa6';
import { Box, Button, Flex, Image, Modal, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import participantShape from '../../types/Participant';

const columns = [
  {
    accessorKey: 'owner.profile.name',
    header: 'Full Name',
  },
  {
    accessorKey: 'owner.profile.headTitle',
    header: 'Head Title',
  },
  {
    accessorKey: 'owner.email',
    header: 'Email',
  },
  {
    accessorKey: 'owner.profile.phone',
    header: 'Phone',
  },
];
function AbsentButton({ imageUrl, title }) {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Button onClick={() => setOpened(true)}>
        <FaRegImage />
        {title}
      </Button>
      <Modal opened={opened} onClose={() => setOpened(false)} title={title}>
        <Image src={imageUrl} alt="Absent Image" />
      </Modal>
    </>
  );
}

function TableParticipant({ title, data }) {
  const table = useMantineReactTable({
    columns,
    data,
    enableFacetedValues: true,
    enableRowNumbers: true,
    // enableRowSelection: true,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    mantinePaginationProps: {
      radius: 'xl',
      size: 'lg',
      rowsPerPageOptions: ['5', '10', '15'],
    },
    mantineSearchTextInputProps: {
      placeholder: 'Search Participant',
    },
    positionToolbarAlertBanner: 'bottom',
    paginationDisplayMode: 'pages',
  });
  return (
    <Box style={{ gap: '15px', display: 'flex', flexDirection: 'column' }}>
      <Text size="lg" fw={700} style={{ color: '#75A47F' }}>{title}</Text>
      <MantineReactTable table={table} />
    </Box>
  );
}

TableParticipant.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.shape(participantShape).isRequired,
};

export default TableParticipant;
