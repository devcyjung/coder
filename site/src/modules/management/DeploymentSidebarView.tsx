import type { AuthorizationResponse, Organization } from "api/typesGenerated";
import { FeatureStageBadge } from "components/FeatureStageBadge/FeatureStageBadge";
import {
	Sidebar as BaseSidebar,
	SettingsSidebarNavItem as SidebarNavItem,
} from "components/Sidebar/Sidebar";
import type { Permissions } from "contexts/auth/permissions";
import { useFeatureVisibility } from "modules/dashboard/useFeatureVisibility";
import type { FC } from "react";

export interface OrganizationWithPermissions extends Organization {
	permissions: AuthorizationResponse;
}

interface DeploymentSidebarProps {
	/** Site-wide permissions. */
	permissions: Permissions;
}

/**
 * A combined deployment settings and organization menu.
 */
export const DeploymentSidebarView: FC<DeploymentSidebarProps> = ({
	permissions,
}) => {
	const { multiple_organizations: hasPremiumLicense } = useFeatureVisibility();

	return (
		<BaseSidebar>
			<DeploymentSettingsNavigation
				permissions={permissions}
				isPremium={hasPremiumLicense}
			/>
		</BaseSidebar>
	);
};

interface DeploymentSettingsNavigationProps {
	/** Site-wide permissions. */
	permissions: Permissions;
	isPremium: boolean;
}

/**
 * Displays navigation for deployment settings.  If active, highlight the main
 * menu heading.
 *
 * Menu items are shown based on the permissions.  If organizations can be
 * viewed, groups are skipped since they will show under each org instead.
 */
const DeploymentSettingsNavigation: FC<DeploymentSettingsNavigationProps> = ({
	permissions,
	isPremium,
}) => {
	return (
		<div>
			<div className="flex flex-col gap-1">
				{permissions.viewDeploymentValues && (
					<SidebarNavItem href="/deployment/general">General</SidebarNavItem>
				)}
				{permissions.viewAllLicenses && (
					<SidebarNavItem href="/deployment/licenses">Licenses</SidebarNavItem>
				)}
				{permissions.editDeploymentValues && (
					<SidebarNavItem href="/deployment/appearance">
						Appearance
					</SidebarNavItem>
				)}
				{permissions.viewDeploymentValues && (
					<SidebarNavItem href="/deployment/userauth">
						User Authentication
					</SidebarNavItem>
				)}
				{permissions.viewDeploymentValues && (
					<SidebarNavItem href="/deployment/external-auth">
						External Authentication
					</SidebarNavItem>
				)}
				{/* Not exposing this yet since token exchange is not finished yet.
          <SidebarNavItem href="oauth2-provider/ap">
            OAuth2 Applications
          </SidebarNavItem>*/}
				{permissions.viewDeploymentValues && (
					<SidebarNavItem href="/deployment/network">Network</SidebarNavItem>
				)}
				{permissions.readWorkspaceProxies && (
					<SidebarNavItem href="/deployment/workspace-proxies">
						Workspace Proxies
					</SidebarNavItem>
				)}
				{permissions.viewDeploymentValues && (
					<SidebarNavItem href="/deployment/security">Security</SidebarNavItem>
				)}
				{permissions.viewDeploymentValues && (
					<SidebarNavItem href="/deployment/observability">
						Observability
					</SidebarNavItem>
				)}
				{permissions.viewAllUsers && (
					<SidebarNavItem href="/deployment/users">Users</SidebarNavItem>
				)}
				{permissions.viewNotificationTemplate && (
					<SidebarNavItem href="/deployment/notifications">
						<div className="flex flex-row items-center gap-2">
							<span>Notifications</span>
							<FeatureStageBadge contentType="beta" size="sm" />
						</div>
					</SidebarNavItem>
				)}
				{permissions.viewOrganizationIDPSyncSettings && (
					<SidebarNavItem href="/deployment/idp-org-sync">
						IdP Organization Sync
					</SidebarNavItem>
				)}
				{!isPremium && (
					<SidebarNavItem href="/deployment/premium">Premium</SidebarNavItem>
				)}
			</div>
		</div>
	);
};
