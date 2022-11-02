import { Meta, StoryFn } from '@storybook/react';
import Pagination from '../index';
import type { PaginationProps } from '../index';
import { withRouter } from 'storybook-addon-react-router-v6';


export default {
    title: 'Pagination',
    component: Pagination,
    decorators: [withRouter],
    parameters: {
      layout: 'fullscreen',
      reactRouter: {
        routePath: '/',
      }
    },
  } as Meta<typeof Pagination>;

const Template: StoryFn<typeof Pagination> = (args:PaginationProps) => <Pagination {...args} />;
export const FiveRangeSize = Template.bind({})
FiveRangeSize.args = {
    itemsPerPage:5,
    totalItems:20,
    rangeSize:5
} 
export const OneRangeSize = Template.bind({})
OneRangeSize.args = {
    itemsPerPage:5,
    totalItems:20,
    rangeSize:1
} 

export const HebrewText = Template.bind({})
HebrewText.args = ({
    itemsPerPage:5,
    totalItems:20,
    rangeSize:5,
    previousText: 'הקודם',
    nextText:'הבא',
    langDir:'rtl'
}) as PaginationProps
