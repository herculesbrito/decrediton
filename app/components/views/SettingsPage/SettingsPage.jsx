import { FormattedMessage as T } from "react-intl";
import { CloseWalletModalButton } from "buttons";
import { TabbedPage, TitleHeader, DescriptionHeader } from "layout";
import LinksTab from "./LinksTab";
import LogsTab from "./LogsTab";
import TutorialsTab from "./TutorialsTab";
import SettingsTab from "./SettingsTab";
import { useSettings } from "hooks";
import styles from "./SettingsPage.module.css";
import { SETTINGS_ICON } from "constants";
import { useTheme } from "pi-ui";

const closeWalletModalContent = (walletName) => (
  <T
    id="settings.closeWalletModalContent"
    m="Are you sure you want to close {walletName} and return to the launcher?"
    values={{ walletName }}
  />
);

export const SettingsTabHeader = () => (
  <DescriptionHeader
    description={
      <T
        id="settings.description"
        m="Changing network settings requires a restart"
      />
    }
  />
);

const SettingsPageHeader = () => {
  const { onCloseWallet, walletName } = useSettings();
  return (
    <TitleHeader
      title={<T id="settings.title" m="Settings" />}
      iconType={SETTINGS_ICON}
      optionalButton={
        <CloseWalletModalButton
          modalTitle={
            <T id="settings.closeWalletModalTitle" m="Confirmation Required" />
          }
          buttonLabel={<T id="settings.closeWalletModalOk" m="Close Wallet" />}
          modalContent={closeWalletModalContent(walletName)}
          className={styles.closeModalButton}
          onSubmit={onCloseWallet}
        />
      }
    />
  );
};

const SettingsPage = () => {
  const { setThemeName } = useTheme();
  const tabs = [
    {
      path: "/settings/settings",
      content: <SettingsTab setThemeName={setThemeName} />,
      header: SettingsTabHeader,
      label: <T id="settings.tab.settings" m="Settings" />
    },
    {
      path: "/settings/links",
      content: LinksTab,
      header: SettingsTabHeader,
      label: <T id="settings.tab.sources" m="Sources" />
    },
    {
      path: "/settings/tutorials",
      content: TutorialsTab,
      header: SettingsTabHeader,
      label: <T id="settings.tab.tutorials" m="Tutorials" />
    },
    {
      path: "/settings/logs",
      content: LogsTab,
      header: SettingsTabHeader,
      label: <T id="settings.tab.logs" m="Logs" />
    }
  ];
  return <TabbedPage header={<SettingsPageHeader />} tabs={tabs} />;
};

export default SettingsPage;
