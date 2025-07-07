import * as React from 'react'
import { useAutocomplete, AutocompleteGetTagProps } from '@mui/base/useAutocomplete'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { autocompleteClasses } from '@mui/material/Autocomplete'

const Root = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
  font-size: 14px;`
)

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 100%;
  border: 1px solid ${theme.palette.secondary.main};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 12px;
  padding: 2px 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.primary.main};
  }

  &.focused {
    border-color: ${theme.palette.secondary.main};
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
    height: 50px;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    outline: 0;
  }
`
)

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} style={{ cursor: 'pointer' }} />
    </div>
  )
}

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  background-color: #F5E0ED;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  padding: 5px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    margin-left: 8px;
    font-size: 12px;
  }
`
)

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 95%;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  max-height: 250px;
  overflow: auto;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;

  & li {
    padding: 5px 12px;
    display: flex;
    align-items: center;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
)

interface CustomizedHookProps {
  data: string[]
  selectedData: string[]
  setSelectedData: (data: string[]) => void
}

export default function CustomizedHook({ data, selectedData, setSelectedData }: CustomizedHookProps) {
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl
  } = useAutocomplete<string, true>({
    id: 'customized-hook-demo',
    defaultValue: selectedData,
    multiple: true,
    options: data,
    getOptionLabel: (option) => option
  })

  React.useEffect(() => {
    setSelectedData(value)
  }, [value])

  return (
    <Root>
      <div {...getRootProps()}>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => (
            <StyledTag label={option} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} placeholder={!value.length ? 'Choose options...' : ''} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 && (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            if (typeof option !== 'string') return null
            const optionLabel = option
            return (
              <li key={`${optionLabel}-${index}`} {...getOptionProps({ option, index })}>
                <span>{optionLabel}</span>
                <CheckIcon fontSize='small' />
              </li>
            )
          })}
        </Listbox>
      )}
    </Root>
  )
}
